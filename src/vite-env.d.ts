/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

export const BASE_URL = import.meta.env.VITE_BEMMBO_BASE_URL;
export const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;
export const MOCK_API = import.meta.env.VITE_MOCK_API === "true";

if (!BASE_URL) {
  throw new Error("VITE_BEMMBO_BASE_URL environment variable is required");
}

if (!AUTH_TOKEN) {
  throw new Error("VITE_AUTH_TOKEN environment variable is required");
}
