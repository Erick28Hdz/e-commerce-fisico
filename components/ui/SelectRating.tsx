// components/ui/SelectRating.tsx
import { ChevronDown } from "lucide-react";

type SelectRatingProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

export default function SelectRating({ label, value, onChange }: SelectRatingProps) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-[var(--color-text-primary)]">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="
            w-full 
            px-4 py-2 
            border-2 border-[var(--color-bg-secondary)] 
            rounded-md 
            bg-[var(--color-bg-light)] 
            text-[var(--color-principal)] 
            appearance-none
            focus:outline-none 
            focus:ring-2 focus:ring-[var(--color-accent)] 
            focus:border-[var(--color-principal)] 
            pr-10
          "
        >
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}+
            </option>
          ))}
        </select>
        <ChevronDown
          size={20}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[var(--color-accent)] pointer-events-none"
        />
      </div>
    </div>
  );
}