import { useEffect, useState } from "react";
import { getInvoices, injectInvoices } from "./api/bemmboApi";
import type { Invoice } from "./models/invoice";
import InvoicesTable from "./components/InvoicesTable";
import FilterBar from "./components/FilterBar";
import type { FilterState } from "./components/FilterBar";
// import Pagination from "./components/Pagination";

export default function InvoicesList() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [injecting, setInjecting] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    name: "",
    currencies: [],
    injectionStatus: [],
  });

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
      // update the invoices list state for the new injected invoices
      setInvoices((previousInvoices) =>
        previousInvoices.map((invoice) =>
          selected.includes(invoice.id)
            ? { ...invoice, injected: true }
            : invoice
        )
      );
      setSelected([]);
    } catch (error: unknown) {
      let errorMessage = "Unknown error";
      if (error instanceof Error) errorMessage = error.message;
      alert("Error injecting invoices: " + errorMessage);
    } finally {
      setInjecting(false);
    }
  };

  // Filtering logic
  const filteredInvoices = invoices.filter((inv) => {
    // Name filter
    if (
      filters.name &&
      !inv.receiverName.toLowerCase().includes(filters.name.toLowerCase())
    ) {
      return false;
    }
    // Currency filter
    if (
      filters.currencies.length > 0 &&
      !filters.currencies.includes(inv.currency)
    ) {
      return false;
    }
    // Injection status filter (multi-select)
    if (filters.injectionStatus.length > 0) {
      if (
        filters.injectionStatus.includes("injected") &&
        filters.injectionStatus.includes("not_injected")
      ) {
        // both selected, show all
        return true;
      } else if (filters.injectionStatus.includes("injected")) {
        return !!inv.injected;
      } else if (filters.injectionStatus.includes("not_injected")) {
        return !inv.injected;
      } else {
        return true;
      }
    }
    return true;
  });

  if (loading) return <div>Loading invoices...</div>;
  if (error) return <div>Error: {error}</div>;
  if (invoices.length === 0) return <div>No invoices found.</div>;

  return (
    <div className="p-6">
      <FilterBar value={filters} onChange={setFilters} />
      <div className="flex justify-end mb-4 mt-4">
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
        invoices={filteredInvoices}
        selected={selected}
        onSelect={toggleInvoiceSelection}
      />
    </div>
  );
}
