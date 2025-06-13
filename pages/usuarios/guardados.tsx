'use client';

import { useEffect, useState } from 'react';
import { Section } from '@/components/ui/Section';
import ProductoCard from "@/components/productos/tarjeta/ProductCard";
import type { Producto } from '@/data/productosMock';
import { Button } from '@/components/ui/Button';

export default function ProductosGuardados() {
    const [guardados, setGuardados] = useState<Producto[]>([]);

    useEffect(() => {
        const productosGuardados = JSON.parse(localStorage.getItem('productos_guardados') || '[]');
        const productosFiltrados = productosGuardados.filter((p: Producto | null) => p && p.id); // <-- aquí el filtro
        setGuardados(productosFiltrados);
    }, []);

    const eliminar = (id: string) => {
        const nuevos = guardados.filter(p => p.id !== id);
        localStorage.setItem('productos_guardados', JSON.stringify(nuevos));
        setGuardados(nuevos);
    };

    return (
        <Section>
            <h2 className="text-2xl font-bold text-center text-[var(--color-principal)] mb-6">
                Productos Guardados
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {guardados.map((producto) => (
                    <div key={producto.id} className="relative">
                        <ProductoCard
                            id={producto.id}
                            slug={producto.slug}
                            nombre={producto.nombre}
                            imagen={producto.imagen}
                            precio={producto.precio}
                            precioAntiguo={producto.precioAntiguo}
                            descuento={producto.descuento}
                            mensaje={producto.mensaje}
                        />
                        <div  className=" flex justify-center mt-2">
                            <Button
                            variant="destructive"
                            onClick={() => eliminar(producto.id)}
                        >
                            Eliminar
                        </Button>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
