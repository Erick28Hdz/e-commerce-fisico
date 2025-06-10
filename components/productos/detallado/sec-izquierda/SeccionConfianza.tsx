import { ShieldCheck, RefreshCcw, Headset, Truck } from "lucide-react";

const items = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-[var(--color-principal)]" />,
    text: "Pago 100% seguro",
  },
  {
    icon: <RefreshCcw className="w-6 h-6 text-[var(--color-principal)]" />,
    text: "Garantía de devolución",
  },
  {
    icon: <Headset className="w-6 h-6 text-[var(--color-principal)]" />,
    text: "Soporte 24/7",
  },
  {
    icon: <Truck className="w-6 h-6 text-[var(--color-principal)]" />,
    text: "Envíos a todo el país",
  },
];

export function SeccionConfianza() {
  return (
    <div className="mt-8 px-6 py-4 bg-[var(--color-bg-secondary)] rounded-xl shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-[var(--color-text-primary)]">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            {item.icon}
            <span className="font-medium">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
