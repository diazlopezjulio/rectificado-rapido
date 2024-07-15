import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { Modelo } from '../../shared/models/modelo.models';

@Injectable({
	providedIn: 'root'
})
export class ModeloService {

	constructor(private dbService: NgxIndexedDBService) { }

	addModelo(modelo: Modelo): Observable<Modelo> {
		return this.dbService.add('modelo', modelo);
	}

	getModeloById(id: number): Observable<Modelo> {
		return this.dbService.getByKey('modelo', id);
	}

	updateModelo(id: number, marca: Modelo): Observable<Modelo> {
		return this.dbService.update('modelo', marca);
	}

	deleteModelo(modelo: Partial<Modelo>): Observable<any> {
		const id = modelo.id ?? 0;
		return this.dbService.delete('modelo', id);
	}

	getAllModelos(): Observable<Modelo[]> {
		return this.dbService.getAll('modelo');
	}
}
