import type { Invoice } from "../models/invoice";
import { useState, useEffect } from "react";

interface InjectConfirmationModalProps {
  open: boolean;
  invoices: Invoice[];
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const ENTRIES_PER_PAGE = 15;

export default function InjectConfirmationModal({
  open,
  invoices,
  onClose,
  onConfirm,
  loading = false,
}: InjectConfirmationModalProps) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  if (!open) return null;

  const totalPages = Math.ceil(invoices.length / ENTRIES_PER_PAGE);
  const paginated = invoices.slice(
    (page - 1) * ENTRIES_PER_PAGE,
    page * ENTRIES_PER_PAGE
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 backdrop-blur-sm z-40" />
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl mx-4 p-0 z-50">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">Inyección de facturas</h2>
            <p className="text-sm text-gray-500">
              Revisa las facturas que se van a inyectar y confirma la operación.
            </p>
          </div>
          <button
            className="text-gray-400 hover:text-gray-700 text-xl"
            onClick={onClose}
            disabled={loading}
          >
            &times;
          </button>
        </div>
        <div className="px-6 py-2 max-h-96 overflow-y-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 font-semibold">Emisor</th>
                <th className="py-2 font-semibold">Monto</th>
                <th className="py-2 font-semibold">Moneda</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((inv) => (
                <tr key={inv.id} className="border-b last:border-b-0">
                  <td className="py-2 whitespace-nowrap">{inv.receiverName}</td>
                  <td className="py-2 whitespace-nowrap">
                    {inv.amount.toLocaleString("es-CL", {
                      style: "currency",
                      currency: inv.currency,
                    })}
                  </td>
                  <td className="py-2 whitespace-nowrap">{inv.currency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 py-2">
            <button
              className="px-2 py-1 rounded hover:bg-gray-200"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
            >
              &lt;
            </button>
            <span className="px-2">
              {page} / {totalPages}
            </span>
            <button
              className="px-2 py-1 rounded hover:bg-gray-200"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || loading}
            >
              &gt;
            </button>
          </div>
        )}
        <div className="flex justify-end gap-4 border-t px-6 py-4">
          <button
            className="px-6 py-2 rounded-lg font-semibold transition-colors border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:bg-gray-100 disabled:cursor-not-allowed"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className="px-6 py-2 rounded-lg font-semibold transition-colors bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading && (
              <svg
                className="animate-spin h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            {loading ? "Inyectando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}
