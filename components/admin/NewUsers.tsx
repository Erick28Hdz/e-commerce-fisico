// components/dashboard/NewUsers.tsx
export const NewUsers = () => {
  const usuarios = ['Carlos', 'Ana', 'Luis', 'Pedro']

  return (
    <section className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Usuarios Nuevos</h2>
      <ul className="list-disc ml-6 text-gray-700">
        {usuarios.map((user, i) => (
          <li key={i}>{user}</li>
        ))}
      </ul>
    </section>
  )
}
