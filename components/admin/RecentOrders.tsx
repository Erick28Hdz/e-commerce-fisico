// components/dashboard/RecentOrders.tsx
export const RecentOrders = () => {
  const ordenes = [
    { id: '#001', cliente: 'Juan', total: '$40.00', estado: 'Enviado' },
    { id: '#002', cliente: 'María', total: '$150.00', estado: 'Pendiente' },
  ]

  return (
    <section className="bg-white p-6 rounded-xl shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Órdenes Recientes</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>ID</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((orden, i) => (
            <tr key={i} className="border-t">
              <td>{orden.id}</td>
              <td>{orden.cliente}</td>
              <td>{orden.total}</td>
              <td>{orden.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
