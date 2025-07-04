import type { Invoice } from "../models/invoice";
import { mockInvoices } from "../mocks/invoices";
import { BASE_URL, AUTH_TOKEN, MOCK_API } from "../vite-env.d";

interface RequestOptions extends RequestInit {
  auth?: boolean;
}

async function apiFetch(endpoint: string, options: RequestOptions = {}) {
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };
  if (options.auth && AUTH_TOKEN) {
    headers["Authorization"] = `${AUTH_TOKEN}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
    },
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

// Fetch invoices from the API
export async function getInvoices(): Promise<Invoice[]> {
  if (MOCK_API) {
    return Promise.resolve(mockInvoices);
  }
  return apiFetch("/invoices", { auth: true });
}

export async function injectInvoices(
  invoiceIds: string[]
): Promise<{ success: boolean; injected: string[] }> {
  if (MOCK_API) {
    // Simulate a successful mock response
    return Promise.resolve({ success: true, injected: invoiceIds });
  }

  const BATCH_SIZE = 25;
  let allInjected: string[] = [];
  let allSuccess = true;

  for (let i = 0; i < invoiceIds.length; i += BATCH_SIZE) {
    const batch = invoiceIds.slice(i, i + BATCH_SIZE);
    while (true) {
      try {
        const result = await apiFetch("/invoices/inject", {
          method: "POST",
          auth: true,
          body: JSON.stringify({ invoiceIds: batch }),
        });
        if (result.success && Array.isArray(result.injected)) {
          allInjected = allInjected.concat(result.injected);
        } else {
          allSuccess = false;
        }
        break;
      } catch (error: unknown) {
        // If error message contains 500, retry indefinitely
        if (
          error instanceof Error &&
          typeof error.message === "string" &&
          error.message.includes("500")
        ) {
          // Add delay before retrying
          await new Promise((resolve) => setTimeout(resolve, 1000));
          continue;
        }
        // For other errors, throw immediately
        throw error;
      }
    }
  }

  return { success: allSuccess, injected: allInjected };
}
