import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { Marca } from '../../shared/models/marca.model';

@Injectable({
	providedIn: 'root'
})
export class MarcaService {

	constructor(private dbService: NgxIndexedDBService) { }

	addMarca(marca: Marca): Observable<Marca> {
		return this.dbService.add('marca', marca);
	}

	getMarcaById(id: number): Observable<Marca> {
		return this.dbService.getByKey('marca', id);
	}

	updateMarca(id: number, marca: Partial<Marca>): Observable<Marca> {
		return this.dbService.update('marca', marca);
	}

	deleteMarca(marca: Partial<Marca>): Observable<any> {
		const id = marca.id ?? 0;
		return this.dbService.delete('marca', id);
	}

	getAllMarcas(): Observable<Marca[]> {
		return this.dbService.getAll('marca');
	}
}
