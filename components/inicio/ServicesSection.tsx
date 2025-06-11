export default function ServicesSection() {
  return (
    <section className="py-16 px-6 bg-[var(--color-bg-light)] text-[var(--color-text-primary)] text-center">
      <h2 className="text-3xl font-bold text-[var(--color-principal)] mb-10">
        ¿Por qué elegirnos?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[var(--color-bg-secondary)] p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="text-xl font-semibold mb-2 text-[var(--color-principal)]">Envíos Express</h3>
          <p className="text-[var(--color-text-primary)]">
            Entregamos tus pedidos en tiempo récord, directamente a tu puerta, en menos de 48 horas.
          </p>
        </div>

        <div className="bg-[var(--color-bg-secondary)] p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-semibold mb-2 text-[var(--color-principal)]">Pagos 100% Seguros</h3>
          <p className="text-[var(--color-text-primary)]">
            Tus datos están protegidos con encriptación de nivel bancario y múltiples métodos de pago confiables.
          </p>
        </div>

        <div className="bg-[var(--color-bg-secondary)] p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <div className="text-4xl mb-4">💬</div>
          <h3 className="text-xl font-semibold mb-2 text-[var(--color-principal)]">Soporte Personalizado</h3>
          <p className="text-[var(--color-text-primary)]">
            Estamos disponibles 24/7 para resolver tus dudas, ayudarte con tus pedidos y brindarte asistencia rápida.
          </p>
        </div>
      </div>
    </section>
  );
}
