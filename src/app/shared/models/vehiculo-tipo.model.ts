export interface VehiculoTipo {
    id?: number;
    nombre: string;
    abreviacion?: string;
    descripcion?: string;
    imagenUrl?: string;
}

export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
}