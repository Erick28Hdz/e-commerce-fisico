// src/components/ui/PaymentIcons.tsx
"use client";
import { FC } from "react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaMobileAlt, // ícono genérico para Nequi/DaviPlata
} from "react-icons/fa";
import { cn } from "@/lib/utils";

interface PaymentIconsProps {
  className?: string;
}

export const PaymentIcons: FC<PaymentIconsProps> = ({ className }) => {
  const paymentMethods = [
    { label: "Visa", icon: FaCcVisa },
    { label: "MasterCard", icon: FaCcMastercard },
    { label: "PayPal", icon: FaCcPaypal },
    { label: "Nequi / DaviPlata", icon: FaMobileAlt },
  ];

  return (
    <div
      className={cn(
        "w-full flex justify-center items-center gap-6 text-4xl text-gray-700",
        className
      )}
    >
      {paymentMethods.map(({ label, icon: Icon }) => (
        <div
          key={label}
          title={label}
          aria-label={label}
          className="hover:text-[var(--color-principal)] transition-colors"
        >
          <Icon />
        </div>
      ))}
    </div>
  );
};
