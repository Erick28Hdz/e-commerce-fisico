// components/dashboard/BestSellers.tsx
export const BestSellers = () => {
  const productos = [
    { nombre: 'Camiseta', cantidad: 120 },
    { nombre: 'Zapatos', cantidad: 85 },
    { nombre: 'Gorra', cantidad: 60 },
  ]

  return (
    <section className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Productos Más Vendidos</h2>
      <ul className="space-y-2">
        {productos.map((prod, i) => (
          <li key={i} className="flex justify-between">
            <span>{prod.nombre}</span>
            <span className="font-semibold">{prod.cantidad} unidades</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
