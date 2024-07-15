import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { Servicio } from '../../shared/models/servicio.model';

@Injectable({
	providedIn: 'root'
})
export class ServicioService {

	constructor(private dbService: NgxIndexedDBService) { }

	addServicio(servicio: Servicio): Observable<Servicio> {
		return this.dbService.add('servicio', servicio);
	}

	getServicioById(id: number): Observable<Servicio> {
		return this.dbService.getByKey('servicio', id);
	}

	updateServicio(id: number, servicio: Partial<Servicio>): Observable<Servicio> {
		return this.dbService.update('servicio', servicio);
	}

	deleteServicio(servicio: Partial<Servicio>): Observable<any> {
		const id = servicio.id ?? 0;
		return this.dbService.delete('servicio', id);
	}

	getAllServicios(): Observable<Servicio[]> {
		return this.dbService.getAll('servicio');
	}
}
