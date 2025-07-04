import { useState } from "react";
import type { Invoice } from "../models/invoice";
import InvoiceRow from "./InvoiceRow";
import Pagination from "./Pagination";

interface InvoicesTableProps {
  invoices: Invoice[];
  selected: string[];
  onSelect: (id: string) => void;
}

const ENTRIES_PER_PAGE = 10;

export default function InvoicesTable({
  invoices,
  selected,
  onSelect,
}: InvoicesTableProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(invoices.length / ENTRIES_PER_PAGE);

  const paginatedInvoices = invoices.slice(
    (page - 1) * ENTRIES_PER_PAGE,
    page * ENTRIES_PER_PAGE
  );

  // Only non-injected invoices are selectable (across all pages)
  const allSelectableIds = invoices
    .filter((inv) => !inv.injected)
    .map((inv) => inv.id);
  const allSelected =
    allSelectableIds.length > 0 &&
    allSelectableIds.every((id) => selected.includes(id));
  const selectedCount = allSelectableIds.filter((id) =>
    selected.includes(id)
  ).length;

  const handleSelectAll = () => {
    if (allSelected) {
      // Deselect all
      allSelectableIds.forEach((id) => onSelect(id));
    } else {
      // Select all
      allSelectableIds.forEach((id) => {
        if (!selected.includes(id)) onSelect(id);
      });
    }
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr className="text-left border-b">
              <th className="p-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-blue-600 w-4 h-4"
                    checked={allSelected}
                    onChange={handleSelectAll}
                    disabled={allSelectableIds.length === 0}
                  />
                  <span className="text-xs text-gray-600">{selectedCount}</span>
                </div>
              </th>
              <th className="p-4 font-semibold">Emisor</th>
              <th className="p-4 font-semibold">Monto</th>
              <th className="p-4 font-semibold">Moneda</th>
              <th className="p-4 font-semibold">Inyectado</th>
            </tr>
          </thead>
          <tbody>
            {paginatedInvoices.map((invoice) => (
              <InvoiceRow
                key={invoice.id}
                invoice={invoice}
                selected={selected.includes(invoice.id)}
                onSelect={onSelect}
              />
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
