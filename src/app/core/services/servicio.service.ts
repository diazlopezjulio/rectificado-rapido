import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { Servicio } from '../../shared/models/servicio.model';

@Injectable({
	providedIn: 'root'
})
export class ServicioService {

	constructor(private dbService: NgxIndexedDBService) { }

	addServicio(vehiculoTipo: Servicio): Observable<Servicio> {
		return this.dbService.add('servicio', vehiculoTipo);
	}

	getServicioById(id: number): Observable<Servicio> {
		return this.dbService.getByKey('servicio', id);
	}

	updateServicio(id: number, vehiculoTipo: Partial<Servicio>): Observable<Servicio> {
		return this.dbService.update('servicio', vehiculoTipo);
	}

	deleteServicio(vehiculoTipo: Partial<Servicio>): Observable<any> {
		const id = vehiculoTipo.id ?? 0;
		return this.dbService.delete('servicio', id);
	}

	getAllServicios(): Observable<Servicio[]> {
		return this.dbService.getAll('servicio');
	}
}
