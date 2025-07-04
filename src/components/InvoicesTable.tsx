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

  return (
    <div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr className="text-left border-b">
              <th className="p-4"></th>
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
