/**
 * CJ Dropshipping API client
 *
 * Docs: https://developers.cjdropshipping.com
 * Auth: email + apiKey → short-lived access token (cached in memory)
 *
 * Required env vars:
 *   CJ_EMAIL          — your CJ account email
 *   CJ_API_KEY        — from CJ dashboard → My CJ → Keys
 */

const CJ_BASE = "https://developers.cjdropshipping.com/api2.0/v1";

let _token: string | null = null;
let _tokenExpiry = 0;

// ── Auth ─────────────────────────────────────────────────────────────────────

async function getAccessToken(): Promise<string> {
  if (_token && Date.now() < _tokenExpiry) return _token;

  const res = await fetch(`${CJ_BASE}/authentication/getAccessToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: process.env.CJ_EMAIL,
      password: process.env.CJ_API_KEY,
    }),
  });

  const data = await res.json();
  if (!data.result || !data.data?.accessToken) {
    throw new Error(`CJ auth failed: ${data.message}`);
  }

  _token = data.data.accessToken as string;
  // Tokens last 12h — refresh after 11h
  _tokenExpiry = Date.now() + 11 * 60 * 60 * 1000;
  return _token;
}

async function cjFetch(path: string, opts: RequestInit = {}) {
  const token = await getAccessToken();
  const res = await fetch(`${CJ_BASE}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      "CJ-Access-Token": token,
      ...(opts.headers ?? {}),
    },
  });
  return res.json();
}

// ── Product search ────────────────────────────────────────────────────────────

export async function searchProducts(keyword: string, pageNum = 1, pageSize = 20) {
  return cjFetch(
    `/product/list?keyword=${encodeURIComponent(keyword)}&pageNum=${pageNum}&pageSize=${pageSize}`
  );
}

export async function getProductDetail(pid: string) {
  return cjFetch(`/product/query?pid=${pid}`);
}

// ── Orders ────────────────────────────────────────────────────────────────────

export interface CJOrderItem {
  vid: string;          // CJ variant ID
  quantity: number;
  shippingName: string; // logistics name e.g. "CJPacket Ordinary"
}

export interface CJShippingAddress {
  consigneeID?: string;
  consignee: string;
  email: string;
  phone: string;
  country: string;       // ISO 2-letter e.g. "US"
  province: string;
  city: string;
  address: string;
  zip: string;
}

export interface CJCreateOrderPayload {
  orderNumber: string;   // your internal order ID (idempotency key)
  shippingAddress: CJShippingAddress;
  products: CJOrderItem[];
  remark?: string;
}

export async function createOrder(payload: CJCreateOrderPayload) {
  return cjFetch("/shopping/order/createOrderV2", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getOrderDetail(orderId: string) {
  return cjFetch(`/shopping/order/getOrderDetail?orderId=${orderId}`);
}

export async function getTrackingInfo(orderId: string) {
  return cjFetch(`/logistic/trackInfo?orderId=${orderId}`);
}
