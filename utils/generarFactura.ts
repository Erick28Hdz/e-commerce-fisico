import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Producto = {
  nombre: string;
  cantidad: number;
  precio: number;
};

type Pedido = {
  id: string;
  total: number;
  productos: Producto[];
  fecha?: string;
  direccion?: string;
  metodoPago?: string;
  cliente?: {
    nombre: string;
    email: string;
  };
};

// 🧠 Utilidad para cargar una imagen como base64 desde /public
async function getBase64Image(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

export async function generarFacturaPDF(pedido: Pedido) {
  const doc = new jsPDF();

  // ✅ Agregar logo
  const logoBase64 = await getBase64Image("/assets/logo.png"); // asegúrate de tener este archivo
  doc.addImage(logoBase64, "PNG", 150, 10, 40, 20); // x, y, width, height

  // ✅ Título
  doc.setFontSize(18);
  doc.text("Factura de Compra", 20, 20);

  // ✅ Datos del pedido
  doc.setFontSize(12);
  doc.text(`Pedido ID: ${pedido.id}`, 20, 40);
  doc.text(`Fecha: ${pedido.fecha || new Date().toLocaleString()}`, 20, 50);
  doc.text(`Dirección: ${pedido.direccion || "No especificada"}`, 20, 60);
  doc.text(`Método de pago: ${pedido.metodoPago || "No especificado"}`, 20, 70);

  if (pedido.cliente) {
    doc.text(`Cliente: ${pedido.cliente.nombre}`, 20, 80);
    doc.text(`Email: ${pedido.cliente.email}`, 20, 90);
  }

  // ✅ Tabla de productos
  autoTable(doc, {
    startY: 100,
    head: [["Producto", "Cantidad", "Precio"]],
    body: pedido.productos.map((p) => [
      p.nombre,
      p.cantidad.toString(),
      `$${p.precio}`,
    ]),
  });

  // ✅ Total
  const finalY = doc.lastAutoTable?.finalY ?? 120;
  doc.text(`Total: $${pedido.total}`, 20, finalY + 10);

  // ✅ Línea de agradecimiento
  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text("Gracias por tu compra. ¡Esperamos verte pronto!", 20, finalY + 30);

  doc.save(`Factura-${pedido.id}.pdf`);
}
