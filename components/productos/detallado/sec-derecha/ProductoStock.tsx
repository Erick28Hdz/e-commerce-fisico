export function ProductoStock({ stock }: { stock: number }) {
  return (
    <p className={`text-sm font-medium ${stock > 0 ? "text-green-600" : "text-red-600"}`}>
      {stock > 0 ? `En stock: ${stock} unidades` : "Sin stock"}
    </p>
  );
}
