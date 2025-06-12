type DatosPersonalesProps = {
  nombre: string;
  correo: string;
  rol: string;
  fechaRegistro: string;
  direccion: string;
  ciudad: string;
  pais: string;
  metodoPago: string;
  ultimaCompra: string;
};

export default function DatosPersonales({
  nombre,
  correo,
  rol,
  fechaRegistro,
  direccion,
  ciudad,
  pais,
  metodoPago,
  ultimaCompra,
}: DatosPersonalesProps) {
  return (
    <div className="flex  border-t pt-6 text-left text-[var(--color-text-primary)] space-y-6">
      {/* Datos Personales */}
      <section>
        <h3 className="text-lg font-semibold text-[var(--color-principal)] mb-2">Datos personales</h3>
        <p><span className="font-semibold">Nombre:</span> {nombre}</p>
        <p><span className="font-semibold">Correo:</span> {correo}</p>
        <p><span className="font-semibold">Rol:</span> {rol}</p>
        <p><span className="font-semibold">Miembro desde:</span> {fechaRegistro}</p>
      </section>

      {/* Dirección de Envío */}
      <section>
        <h3 className="text-lg font-semibold text-[var(--color-principal)] mb-2">Dirección de envío</h3>
        <p><span className="font-semibold">Dirección:</span> {direccion}</p>
        <p><span className="font-semibold">Ciudad:</span> {ciudad}</p>
        <p><span className="font-semibold">País:</span> {pais}</p>
      </section>

      {/* Información de Pago */}
      <section>
        <h3 className="text-lg font-semibold text-[var(--color-principal)] mb-2">Información de pago</h3>
        <p><span className="font-semibold">Método de pago:</span> {metodoPago}</p>
        <p><span className="font-semibold">Última compra:</span> {ultimaCompra}</p>
      </section>
    </div>
  );
}
