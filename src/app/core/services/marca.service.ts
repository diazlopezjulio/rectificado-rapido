import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { Marca } from '../../shared/models/marca.model';

@Injectable({
	providedIn: 'root'
})
export class MarcaService {

	constructor(private dbService: NgxIndexedDBService) { }

	addMarca(vehiculoTipo: Marca): Observable<Marca> {
		return this.dbService.add('marca', vehiculoTipo);
	}

	getMarcaById(id: number): Observable<Marca> {
		return this.dbService.getByKey('marca', id);
	}

	updateMarca(id: number, vehiculoTipo: Partial<Marca>): Observable<Marca> {
		return this.dbService.update('marca', vehiculoTipo);
	}

	deleteMarca(vehiculoTipo: Partial<Marca>): Observable<any> {
		const id = vehiculoTipo.id ?? 0;
		return this.dbService.delete('marca', id);
	}

	getAllMarcas(): Observable<Marca[]> {
		return this.dbService.getAll('marca');
	}
}
