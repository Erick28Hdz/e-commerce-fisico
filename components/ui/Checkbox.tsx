// components/ui/FormCheckbox.tsx
type FormCheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
};

export default function FormCheckbox({ id, label, checked, onChange }: FormCheckboxProps) {
  return (
    <div className="mb-4 flex items-center gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="
          w-5 h-5 
          border-2 rounded 
          border-[var(--color-principal)] 
          bg-[var(--color-bg-light)] 
          checked:bg-[var(--color-accent)] 
          checked:border-[var(--color-principal)]
          transition-colors duration-200
          cursor-pointer
          appearance-none
          flex-shrink-0
          relative
        "
      />
      <label
        htmlFor={id}
        className="font-medium text-[var(--color-text-primary)] hover:text-[var(--color-principal)]"
      >
        {label}
      </label>
    </div>
  );
}
