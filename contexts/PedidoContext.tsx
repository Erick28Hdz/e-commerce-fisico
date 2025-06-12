import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Producto } from "@/data/productosMock";

interface Pedido {
  productos: Producto[];
  total: number;
  cantidad: number;
  fecha: string;
}

interface PedidoContextType {
  pedido: Pedido | null;
  setPedido: (pedido: Pedido) => void;
}

const PedidoContext = createContext<PedidoContextType>({
  pedido: null,
  setPedido: () => {},
});

export const PedidoProvider = ({ children }: { children: ReactNode }) => {
  const [pedido, setPedidoState] = useState<Pedido | null>(null);

  // Guardar en localStorage
  const setPedido = (nuevoPedido: Pedido) => {
    setPedidoState(nuevoPedido);
    localStorage.setItem("pedido", JSON.stringify(nuevoPedido));
  };

  // Recuperar al cargar la app
  useEffect(() => {
    const stored = localStorage.getItem("pedido");
    if (stored) {
      setPedidoState(JSON.parse(stored));
    }
  }, []);

  return (
    <PedidoContext.Provider value={{ pedido, setPedido }}>
      {children}
    </PedidoContext.Provider>
  );
};

export const usePedido = () => useContext(PedidoContext);
