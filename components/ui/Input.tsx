type FormInputProps<T extends string | number> = {
  label: string;
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  type?: React.HTMLInputTypeAttribute; // "text" | "number" | "email" | ...
};

export default function FormInput<T extends string | number>({
  label,
  value,
  onChange,
  placeholder = "",
  min,
  max,
  type = "text", // ✅ mejor default
}: FormInputProps<T>) {
  return (
    <div className="mb-5">
      <label
        className="block mb-2 font-semibold text-[var(--color-text-primary)]"
        htmlFor={label.replace(/\s+/g, "").toLowerCase()}
      >
        {label}
      </label>
      <input
        id={label.replace(/\s+/g, "").toLowerCase()}
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value === ""
              ? ("" as T)
              : (type === "number"
                  ? (Number(e.target.value) as T)
                  : (e.target.value as T))
          )
        }
        placeholder={placeholder}
        className="
          w-full 
          px-4 py-2 
          border-2 border-[var(--color-accent)] 
          rounded-md 
          bg-[var(--color-bg-secondary)] 
          text-[var(--color-principal)] 
          placeholder:text-[var(--color-text-primary)] 
          focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-principal)] 
          transition
          duration-200
          ease-in-out
        "
      />
    </div>
  );
}
