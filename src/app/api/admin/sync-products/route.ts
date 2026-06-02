import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";
import { searchProducts } from "@/lib/cj";

export const runtime = "nodejs";

interface SyncResult {
  sku: string;
  name: string;
  cjProductId: string | null;
  cjVariantId: string | null;
  matched: boolean;
  cjProductName?: string;
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.CJ_EMAIL || !process.env.CJ_API_KEY) {
    return NextResponse.json(
      { error: "CJ_EMAIL and CJ_API_KEY must be set" },
      { status: 500 }
    );
  }

  const results: SyncResult[] = [];
  const unmatched: string[] = [];

  for (const product of products) {
    try {
      const searchResult = await searchProducts(product.cjSearchKeyword, 1, 5);

      if (searchResult.list && searchResult.list.length > 0) {
        const bestMatch = searchResult.list[0];
        const variant = bestMatch.variants?.[0];

        results.push({
          sku: product.sku,
          name: product.name,
          cjProductId: bestMatch.pid,
          cjVariantId: variant?.vid ?? null,
          matched: true,
          cjProductName: bestMatch.productName,
        });

        // Upsert mapping to Supabase
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
          await fetch(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/cj_product_mappings`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
                Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
                Prefer: "resolution=merge-duplicates",
              },
              body: JSON.stringify({
                sku: product.sku,
                product_id: product.id,
                product_name: product.name,
                cj_product_id: bestMatch.pid,
                cj_variant_id: variant?.vid ?? null,
                cj_product_name: bestMatch.productName,
                cj_sell_price: bestMatch.sellPrice,
                retail_price: product.price,
              }),
            }
          ).catch((err) => console.error(`Supabase upsert failed for ${product.sku}:`, err));
        }
      } else {
        results.push({
          sku: product.sku,
          name: product.name,
          cjProductId: null,
          cjVariantId: null,
          matched: false,
        });
        unmatched.push(`${product.sku}: ${product.name} (keyword: "${product.cjSearchKeyword}")`);
      }
    } catch (err) {
      console.error(`CJ search failed for ${product.sku}:`, err);
      results.push({
        sku: product.sku,
        name: product.name,
        cjProductId: null,
        cjVariantId: null,
        matched: false,
      });
      unmatched.push(`${product.sku}: ${product.name} (error: ${err instanceof Error ? err.message : "unknown"})`);
    }
  }

  const matched = results.filter((r) => r.matched).length;

  return NextResponse.json({
    total: products.length,
    matched,
    unmatched: products.length - matched,
    unmatchedProducts: unmatched,
    results,
  });
}
