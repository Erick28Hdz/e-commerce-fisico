export default function PromoBanner() {
  return (
    <section className="bg-[var(--color-accent)] text-[var(--color-text-primary)] py-4 px-6 text-center shadow-md">
      <p className="text-base md:text-lg font-semibold flex items-center justify-center gap-2">
        <span role="img" aria-label="alerta">🚚</span>
        <span>
          ¡Envío <strong>gratis</strong> en compras superiores a <strong>$100.000</strong>!
        </span>
      </p>
    </section>
  );
}