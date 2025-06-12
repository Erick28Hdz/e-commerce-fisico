type AvatarUsuarioProps = {
  nombre: string;
};

export default function AvatarUsuario({ nombre }: AvatarUsuarioProps) {
  return (
    <div className="flex flex-col items-center mb-6">
      <img
        src="/assets/principales/avatar-placeholder.png"
        alt="Avatar"
        className="w-24 h-24 rounded-full border-4 border-[var(--color-principal)] mb-4"
      />
      <h2 className="text-2xl font-bold text-[var(--color-principal)]">{nombre}</h2>
    </div>
  );
}

