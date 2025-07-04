import type { Invoice } from "../models/invoice";
import { useState, useEffect } from "react";

interface InjectConfirmationModalProps {
  open: boolean;
  invoices: Invoice[];
  onClose: () => void;
  onConfirm: () => void;
}

const ENTRIES_PER_PAGE = 15;

export default function InjectConfirmationModal({
  open,
  invoices,
  onClose,
  onConfirm,
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
              disabled={page === 1}
            >
              &lt;
            </button>
            <span className="px-2">
              {page} / {totalPages}
            </span>
            <button
              className="px-2 py-1 rounded hover:bg-gray-200"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              &gt;
            </button>
          </div>
        )}
        <div className="flex justify-end gap-2 border-t px-6 py-4">
          <button
            className="px-4 py-2 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-700 text-white font-semibold hover:bg-blue-800"
            onClick={onConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
