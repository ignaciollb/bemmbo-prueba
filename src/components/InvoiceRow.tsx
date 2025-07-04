import type { Invoice } from "../models/invoice";
import InjectedStatusIcon from "./InjectedStatusIcon";

interface InvoiceRowProps {
  invoice: Invoice;
  selected: boolean;
  onSelect: (id: string) => void;
}

export default function InvoiceRow({
  invoice,
  selected,
  onSelect,
}: InvoiceRowProps) {
  return (
    <tr className="border-b border-gray-300 hover:bg-gray-50 transition-colors">
      <td className="p-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(invoice.id)}
          className="accent-blue-600 w-4 h-4"
        />
      </td>
      <td className="p-4">{invoice.receiverName}</td>
      <td className="p-4">
        {invoice.amount.toLocaleString("es-CL", {
          style: "currency",
          currency: invoice.currency,
        })}
      </td>
      <td className="p-4">{invoice.currency}</td>
      <td className="p-4">
        <InjectedStatusIcon injected={invoice.injected ?? false} />
      </td>
    </tr>
  );
}
