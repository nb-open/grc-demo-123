import { ApiResponse } from "../../shared/types"
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, { 
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, 
    ...init 
  });
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error(`Invalid response type: ${contentType || 'unknown'}. Expected JSON.`);
  }
  let json: ApiResponse<T>;
  try {
    json = (await res.json()) as ApiResponse<T>;
  } catch (e) {
    throw new Error(`Failed to parse response body from ${path}`);
  }
  if (!res.ok || !json.success || json.data === undefined) {
    const errorMessage = json.error || `Request to ${path} failed with status ${res.status}`;
    console.warn('[API ERROR]', { path, status: res.status, error: errorMessage });
    throw new Error(errorMessage);
  }
  return json.data;
}