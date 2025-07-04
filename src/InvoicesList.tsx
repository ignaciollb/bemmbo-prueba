import { useEffect, useState } from "react";
import { getInvoices, injectInvoices } from "./api/bemmboApi";
import type { Invoice } from "./models/invoice";
import InvoicesTable from "./components/InvoicesTable";
// import Pagination from "./components/Pagination";

export default function InvoicesList() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [injecting, setInjecting] = useState(false);

  useEffect(() => {
    getInvoices()
      .then((data) => {
        setInvoices(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const toggleInvoiceSelection = (invoiceId: string) => {
    setSelected((previousSelected) =>
      previousSelected.includes(invoiceId)
        ? previousSelected.filter(
            (selectedInvoiceId) => selectedInvoiceId !== invoiceId
          )
        : [...previousSelected, invoiceId]
    );
  };

  const handleInject = async () => {
    if (selected.length === 0 || injecting) return;
    setInjecting(true);
    try {
      await injectInvoices(selected);
      setInvoices((prev) =>
        prev.map((inv) =>
          selected.includes(inv.id) ? { ...inv, injected: true } : inv
        )
      );
      setSelected([]);
    } catch (err: unknown) {
      let message = "Unknown error";
      if (err instanceof Error) message = err.message;
      alert("Error injecting invoices: " + message);
    } finally {
      setInjecting(false);
    }
  };

  if (loading) return <div>Loading invoices...</div>;
  if (error) return <div>Error: {error}</div>;
  if (invoices.length === 0) return <div>No invoices found.</div>;

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <button
          className={`px-6 py-2 rounded-lg transition-colors ${
            selected.length === 0 || injecting
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          }`}
          disabled={selected.length === 0 || injecting}
          onClick={handleInject}
        >
          {injecting ? "Inyectando..." : "Inyectar"}
        </button>
      </div>
      <InvoicesTable
        invoices={invoices}
        selected={selected}
        onSelect={toggleInvoiceSelection}
      />
      {/* <Pagination /> */}
    </div>
  );
}
