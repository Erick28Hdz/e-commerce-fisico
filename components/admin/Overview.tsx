// components/dashboard/Overview.tsx
export const Overview = () => {
  const stats = [
    { label: 'Ventas hoy', value: '$1,200' },
    { label: 'Órdenes', value: '32' },
    { label: 'Clientes nuevos', value: '5' },
    { label: 'Ingresos', value: '$12,400' },
  ]

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">{stat.label}</p>
          <p className="text-xl font-bold">{stat.value}</p>
        </div>
      ))}
    </section>
  )
}
