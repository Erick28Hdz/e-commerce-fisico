// components/ui/Paginacion.tsx
import { Button } from "./Button";

interface PaginacionProps {
    paginaActual: number;
    totalPaginas: number;
    onCambiarPagina: (pagina: number) => void;
}

export default function Paginacion({
    paginaActual,
    totalPaginas,
    onCambiarPagina,
}: PaginacionProps) {
    const baseBtn =
        "px-4 py-2 rounded border transition-colors duration-200";

    return (
        <div className="mt-8 flex justify-center items-center gap-3">
            <Button
                onClick={() => onCambiarPagina(paginaActual - 1)}
                disabled={paginaActual === 1}
                variant="secondary"
            >
                Anterior
            </Button>

            {[...Array(totalPaginas)].map((_, index) => {
                const numeroPagina = index + 1;
                const esActual = paginaActual === numeroPagina;
                return (
                    <Button
                        key={numeroPagina}
                        onClick={() => onCambiarPagina(numeroPagina)}
                        className={
                            esActual
                                ? "bg-[var(--color-principal)] text-[var(--color-text-secondary)] border-2 border-[var(--color-principal)]"
                                : "border-2 border-[var(--color-principal)] text-[var(--color-text-primary)]"
                        }
                    >
                        {numeroPagina}
                    </Button>
                );
            })}

            <Button
                onClick={() => onCambiarPagina(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
                variant="secondary"
            >
                Siguiente
            </Button>
        </div>
    );
}
