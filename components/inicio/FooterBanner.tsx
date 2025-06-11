export default function FooterBanner() {
  return (
    <section className="bg-[var(--color-principal)] text-[var(--color-text-secondary)] text-center py-12 px-6 mt-20 rounded-lg shadow-lg">
      <h3 className="mb-4">
        ¡Aprovecha nuestra oferta exclusiva por tiempo limitado!
      </h3>
      <p className="mb-2">
        Obtén <strong>10% de descuento</strong> en tu primera compra usando el código:
      </p>
      <p className="text-xl font-bold tracking-wide bg-[var(--color-accent)] text-[var(--color-text-primary)] inline-block px-4 py-2 rounded-md mt-2">
        PRIMERACOMPRA
      </p>
      <p className="mt-4 italic">Aplica solo en productos seleccionados. ¡No lo dejes pasar!</p>
    </section>
  );
}
