export interface Producto {
  id: string
  nombre: string
  slug: string
  referencia: string
  descripcion: string
  precio: number
  precioAntiguo?: number
  descuento?: number
  mensaje?: string
  imagen: string
  imagenesSecundarias: string[]
  stock: number
  variantes: string[]
  color: string
  categoria: string
  tiempoEnvioDias?: number
  ubicacion?: string
  limiteStockVisible?: number
  createdAt: string // o Date si prefieres manipularlo como objeto

  // Relaciones omitidas para simplificar el tipo (puedes añadirlas si las necesitas)
  // pedidos?: PedidoItem[]
  // inventory?: Inventory[]
  // descuentos?: Discount[]
  // opcionesEnvio?: ShippingOption[]
  // Categoria?: Categoria
  // categoriaSlug?: string
  // Variante?: Variante[]
  // Favorito?: Favorito[]
  // Comentario?: Comentario[]
  // Estrella?: Estrella[]
  // ProductoGuardado?: ProductoGuardado[]
}
