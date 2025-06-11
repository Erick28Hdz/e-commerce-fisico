import { useState, useEffect } from "react";
import { categoriasMock } from "@/data/categoriasMock";
import CategoryList from "@/components/productos/sidebar/CategoriasList";
import FormCheckbox from "../../ui/Checkbox";
import FormInput from "../../ui/Input";
import SelectRating from "@/components/ui/SelectRating";
import { Button } from "../../ui/Button";

type Props = {
    onFiltrar: (filtros: any) => void;
};

export default function SidebarCategorias({ onFiltrar }: Props) {
    const [precioMin, setPrecioMin] = useState<number | "">("");
    const [precioMax, setPrecioMax] = useState<number | "">("");
    const [puntuacionMin, setPuntuacionMin] = useState<number>(0);
    const [soloEnStock, setSoloEnStock] = useState(false);
    const [tienePromocion, setTienePromocion] = useState(false);
    const [tieneDescuento, setTieneDescuento] = useState(false);
    const [descuentoMin, setDescuentoMin] = useState<number | "">("");
    const [descuentoMax, setDescuentoMax] = useState<number | "">("");
    const [rating, setRating] = useState<number>(0);

    useEffect(() => {
        onFiltrar({
            precioMin,
            precioMax,
            puntuacionMin: rating,
            soloEnStock,
            tienePromocion,
            tieneDescuento,
            descuentoMin,
            descuentoMax,
            rating,
        });
    }, [
        precioMin,
        precioMax,
        rating,
        soloEnStock,
        tienePromocion,
        tieneDescuento,
        descuentoMin,
        descuentoMax,
        onFiltrar,
    ]);

    return (
        <aside className="w-64 top-6 self-start">
            <h3 className="text-start mb-2">Categorías</h3>
            <CategoryList categorias={categoriasMock} />

            {/* Filtros */}
            <div className="
                flex flex-col gap-3 mb-3 
                bg-[var(--color-bg-light)] 
                p-4 rounded-md 
                border border-accent
            ">
                <h4 className="text-xl font-semibold mb-3">Filtros</h4>

                {/* Precio */}
                <FormInput
                    label="Precio mínimo"
                    value={precioMin}
                    onChange={setPrecioMin}
                    placeholder="0"
                    min={0}
                />
                <FormInput
                    label="Precio máximo"
                    value={precioMax}
                    onChange={setPrecioMax}
                    placeholder="1000"
                    min={0}
                />

                {/* Puntuación mínima */}
                <SelectRating
                    label="Calificación mínima"
                    value={rating}
                    onChange={setRating}
                />

                {/* Solo en stock */}
                <FormCheckbox
                    id="stock"
                    label="Solo productos en stock"
                    checked={soloEnStock}
                    onChange={() => setSoloEnStock(!soloEnStock)}
                />

                {/* Promoción */}
                <FormCheckbox
                    id="promocion"
                    label="Solo productos con promociones"
                    checked={tienePromocion}
                    onChange={() => setTienePromocion(!tienePromocion)}
                />

                {/* Descuento */}
                <FormCheckbox
                    id="descuento"
                    label="Solo productos con descuento"
                    checked={tieneDescuento}
                    onChange={() => setTieneDescuento(!tieneDescuento)}
                />

                {/* Rango de descuento */}
                <FormInput
                    label="Descuento mínimo (%)"
                    value={descuentoMin}
                    onChange={setDescuentoMin}
                    placeholder="10"
                    min={0}
                    max={100}
                />
                <FormInput
                    label="Descuento máximo (%)"
                    value={descuentoMax}
                    onChange={setDescuentoMax}
                    placeholder="70"
                    min={0}
                    max={100}
                />
            </div>
        </aside>
    );
}
