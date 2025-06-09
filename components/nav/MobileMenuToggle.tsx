import { FC } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button";

interface MobileMenuToggleProps {
  isOpen: boolean;
  toggle: () => void;
}

export const MobileMenuToggle: FC<MobileMenuToggleProps> = ({ isOpen, toggle }) => (
  <Button onClick={toggle} variant="ghost"
    size="icon"
    className="md:hidden"
    aria-label="Abrir menú">
    {isOpen ? <X className="w-6 h-6 text-secondary" /> : <Menu className="w-6 h-6 text-secondary" />}
  </Button>
);
