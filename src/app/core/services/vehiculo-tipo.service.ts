// services/vehiculo-tipo.service.ts
import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { VehiculoTipo } from '../../shared/models/vehiculo-tipo.model';

@Injectable({
	providedIn: 'root'
})
export class VehiculoTipoService {

	constructor(private dbService: NgxIndexedDBService) { }

	addVehiculoTipo(vehiculoTipo: VehiculoTipo): Observable<any> {
		return this.dbService.add('vehiculoTipo', vehiculoTipo);
	}

	getVehiculoTipoById(id: number): Observable<VehiculoTipo> {
		return this.dbService.getByKey('vehiculoTipo', id);
	}

	updateVehiculoTipo(id: number, vehiculoTipo: Partial<VehiculoTipo>): Observable<any> {
		return this.dbService.update('vehiculoTipo', vehiculoTipo);
	}

	deleteVehiculoTipo(id: number): Observable<any> {
		return this.dbService.delete('vehiculoTipo', id);
	}

	getAllVehiculoTipos(): Observable<VehiculoTipo[]> {
		return this.dbService.getAll('vehiculoTipo');
	}
}
