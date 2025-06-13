import { useEffect, useState } from 'react';
import type { Producto } from '@/data/productosMock';
import { useSesion } from '@/contexts/SesionContext';

export const useProductoGuardado = (producto: Producto) => {
    const [guardado, setGuardado] = useState(false);
    const { usuario, estaAutenticado } = useSesion(); // ✔️ usamos el contexto

    useEffect(() => {
        if (!producto || !producto.id || estaAutenticado === undefined) return;

        try {
            const guardados: Producto[] = JSON.parse(localStorage.getItem('productos_guardados') || '[]');
            const yaGuardado = guardados.some(p => p.id === producto.id);
            setGuardado(yaGuardado);
        } catch (error) {
            console.error("Error al cargar productos guardados:", error);
            setGuardado(false);
        }
    }, [producto, estaAutenticado]);

    const toggleGuardado = () => {
        if (!estaAutenticado) {
            alert("Debes iniciar sesión para guardar productos.");
            return;
        }

        try {
            const guardadosRaw = JSON.parse(localStorage.getItem('productos_guardados') || '[]');
            const guardados: Producto[] = guardadosRaw.filter(
                (p: any): p is Producto => p && typeof p.id === 'string' && typeof p.nombre === 'string'
            );

            if (guardado) {
                const nuevos = guardados.filter((p: Producto) => p.id !== producto.id);
                localStorage.setItem('productos_guardados', JSON.stringify(nuevos));
                setGuardado(false);
            } else {
                guardados.push(producto);
                localStorage.setItem('productos_guardados', JSON.stringify(guardados));
                setGuardado(true);
            }
        } catch (error) {
            console.error("Error al guardar/eliminar producto:", error);
        }
    };

    return { guardado, toggleGuardado };
};
