export class Configuracion {
	nombre: string;
	link: string;
	static configuracionesBase: Configuracion[] = [];

	constructor(nombre: string, link: string) {
		this.nombre = nombre;
		this.link = link;
	}

	static agregarConfiguracionesBase(): Configuracion[] {
		if (this.configuracionesBase.length === 0) {
			this.configuracionesBase.push(new Configuracion('Tipo de Vehiculo', '/tipo-vehiculo'));
			this.configuracionesBase.push(new Configuracion('Tipo de Servicio', '/servicios'));
		}
		return this.configuracionesBase;
	}
}