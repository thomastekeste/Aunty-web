const CJ_BASE_URL = "https://developers.cjdropshipping.com/api2.0/v1";

let cachedToken: { token: string; expiresAt: number } | null = null;

function getCjCredentials() {
  const email = process.env.CJ_EMAIL;
  const apiKey = process.env.CJ_API_KEY;
  if (!email || !apiKey) {
    throw new Error("Missing CJ_EMAIL or CJ_API_KEY environment variables");
  }
  return { email, apiKey };
}

async function cjFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getAccessToken();
  const res = await fetch(`${CJ_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "CJ-Access-Token": token,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`CJ API ${res.status}: ${text}`);
  }

  const json = (await res.json()) as { code: number; result: boolean; message: string; data: T };
  if (json.code !== 200) {
    throw new Error(`CJ API error ${json.code}: ${json.message}`);
  }

  return json.data;
}

export async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const { email, apiKey } = getCjCredentials();

  const res = await fetch(`${CJ_BASE_URL}/authentication/getAccessToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: apiKey }),
  });

  if (!res.ok) {
    throw new Error(`CJ auth failed: ${res.status}`);
  }

  const json = (await res.json()) as {
    code: number;
    data: { accessToken: string; accessTokenExpiryDate: string };
  };

  if (json.code !== 200 || !json.data?.accessToken) {
    throw new Error("CJ auth: no access token returned");
  }

  cachedToken = {
    token: json.data.accessToken,
    expiresAt: Date.now() + 10 * 60 * 60 * 1000, // 10h (token lasts 12h, refresh early)
  };

  return cachedToken.token;
}

export interface CJProduct {
  pid: string;
  productName: string;
  productImage: string;
  sellPrice: number;
  variants: CJVariant[];
}

export interface CJVariant {
  vid: string;
  variantName: string;
  variantSellPrice: number;
  variantImage: string;
}

export async function searchProducts(
  keyword: string,
  pageNum = 1,
  pageSize = 20
): Promise<{ list: CJProduct[]; total: number }> {
  return cjFetch<{ list: CJProduct[]; total: number }>("/product/list", {
    method: "PATCH",
    body: JSON.stringify({
      productNameEn: keyword,
      pageNum,
      pageSize,
    }),
  });
}

export async function getProductDetail(pid: string): Promise<CJProduct> {
  return cjFetch<CJProduct>(`/product/query?pid=${encodeURIComponent(pid)}`);
}

export interface CJOrderItem {
  vid: string;
  quantity: number;
}

export interface CJShippingAddress {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  province: string;
  city: string;
  address: string;
  zip: string;
}

export interface CJOrderRequest {
  orderNumber: string;
  shippingAddress: CJShippingAddress;
  products: CJOrderItem[];
}

export interface CJOrderResponse {
  orderId: string;
  orderNumber: string;
  orderStatus: string;
}

export async function createOrder(
  order: CJOrderRequest
): Promise<CJOrderResponse> {
  return cjFetch<CJOrderResponse>("/shopping/order/createOrder", {
    method: "POST",
    body: JSON.stringify(order),
  });
}

export interface CJOrderStatus {
  orderId: string;
  orderNumber: string;
  orderStatus: string;
  trackingNumber: string;
  logisticsStatus: string;
  shippingCarrier: string;
}

export async function queryOrder(orderId: string): Promise<CJOrderStatus> {
  return cjFetch<CJOrderStatus>(
    `/shopping/order/getOrderDetail?orderId=${encodeURIComponent(orderId)}`
  );
}
