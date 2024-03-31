export interface Usuario {
    id: number;
    nombreUsuario: string;
    hashContrasena: string;
    sal: string;
    correoElectronico: string;
    fechaCreacion: string;
    fechaUltimoAcceso?: string;  // Opcional porque puede no estar presente en todos los objetos
    estado: boolean;
    intentosLogin: number;
    bloqueado: boolean;
    imagenUrl?: string;  // Opcional, asumiendo que no todos los usuarios tienen una imagen
}

export interface VehiculoTipo {
    id: string;
    nombre: string;
    descripcion: string;
    imagenUrl?: string;  // Opcional, asumiendo que no todos los tipos tienen una imagen
}

export interface Marca {
    id: number;
    nombre: string;
    imagenUrl?: string;  // Opcional
}

export interface Modelo {
    id: number;
    marcaId: number;
    tipoId: number;
    nombre: string;
    imagenUrl?: string;  // Opcional
}

export interface Servicio {
    id: number;
    descripcion: string;
}

export interface ModeloServicio {
    id: number;
    modeloId: number;
    servicioId: number;
    cantidad: number;
    precio: number;
    sku: string;
}

// Y una interfaz para representar la estructura completa del JSON
export interface RootObject {
    Usuario: Usuario[];
    VehiculoTipo: VehiculoTipo[];
    Marca: Marca[];
    Modelo: Modelo[];
    Servicio: Servicio[];
    ModeloServicio: ModeloServicio[];
}
