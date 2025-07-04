interface InjectedStatusIconProps {
  injected: boolean;
}

export default function InjectedStatusIcon({
  injected,
}: InjectedStatusIconProps) {
  return (
    <span
      className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-white font-bold ${
        injected ? "bg-green-500" : "bg-red-500"
      }`}
      title={injected ? "Inyectado" : "No inyectado"}
    >
      {injected ? "✓" : "✗"}
    </span>
  );
}
