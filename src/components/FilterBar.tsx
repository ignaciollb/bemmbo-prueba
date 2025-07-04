const CURRENCIES = ["CLP", "USD"];
const INJECTION_STATUS = [
  { value: "injected", label: "Inyectado" },
  { value: "not_injected", label: "No inyectado" },
];

export interface FilterState {
  name: string;
  currencies: string[];
  injectionStatus: string[];
}

interface FilterBarProps {
  value: FilterState;
  onChange: (filters: FilterState) => void;
}

export default function FilterBar({ value, onChange }: FilterBarProps) {
  const handleCurrencyToggle = (currency: string) => {
    if (value.currencies.includes(currency)) {
      onChange({
        ...value,
        currencies: value.currencies.filter((c) => c !== currency),
      });
    } else {
      onChange({ ...value, currencies: [...value.currencies, currency] });
    }
  };

  const handleStatusToggle = (status: string) => {
    if (value.injectionStatus.includes(status)) {
      onChange({
        ...value,
        injectionStatus: value.injectionStatus.filter((s) => s !== status),
      });
    } else {
      onChange({
        ...value,
        injectionStatus: [...value.injectionStatus, status],
      });
    }
  };

  const handleClear = () => {
    onChange({ name: "", currencies: [], injectionStatus: [] });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 py-4 bg-white rounded-t-lg border-b border-gray-200">
      <input
        type="text"
        placeholder="Buscar por nombre..."
        className="border rounded px-3 py-2 text-sm w-56"
        value={value.name}
        onChange={(e) => onChange({ ...value, name: e.target.value })}
      />
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Monedas</span>
        {CURRENCIES.map((currency) => (
          <button
            key={currency}
            type="button"
            className={`px-2 py-1 rounded border text-xs font-semibold ${
              value.currencies.includes(currency)
                ? "bg-blue-100 border-blue-400 text-blue-700"
                : "bg-white border-gray-300 text-gray-700"
            }`}
            onClick={() => handleCurrencyToggle(currency)}
          >
            {currency}
            {value.currencies.includes(currency) && (
              <span className="ml-1">×</span>
            )}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Estado de inyección</span>
        {INJECTION_STATUS.map((status) => (
          <button
            key={status.value}
            type="button"
            className={`px-2 py-1 rounded border text-xs font-semibold ${
              value.injectionStatus.includes(status.value)
                ? "bg-blue-100 border-blue-400 text-blue-700"
                : "bg-white border-gray-300 text-gray-700"
            }`}
            onClick={() => handleStatusToggle(status.value)}
          >
            {status.label}
            {value.injectionStatus.includes(status.value) && (
              <span className="ml-1">×</span>
            )}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="ml-auto px-6 py-2 rounded-lg font-semibold transition-colors bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200"
        onClick={handleClear}
      >
        Limpiar
      </button>
    </div>
  );
}
