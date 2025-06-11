// components/ui/Section.tsx
import { FC, ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export const Section: FC<SectionProps> = ({ children, className = "" }) => {
  return (
    <section className={`max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-14 ${className}`}>
      {children}
    </section>
  );
};
