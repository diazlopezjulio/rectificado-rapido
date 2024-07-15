export interface Modelo {
	id?: number;
	marcaId?: number; // Referencia a un id de la tabla marca
	tipoId?: number; // Referencia a un id de la tabla tipo (aunque no se muestra en el fragmento, se asume su existencia)
	nombre?: string;
	abreviacion?: string;
	descripcion?: string;
	imagenUrl?: string;
}