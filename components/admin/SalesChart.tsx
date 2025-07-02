// components/dashboard/SalesChart.tsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Lun', ventas: 300 },
  { name: 'Mar', ventas: 500 },
  { name: 'Mié', ventas: 400 },
  { name: 'Jue', ventas: 800 },
  { name: 'Vie', ventas: 600 },
]

export const SalesChart = () => {
  return (
    <section className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Ventas Semanales</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="ventas" stroke="#6366f1" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </section>
  )
}
