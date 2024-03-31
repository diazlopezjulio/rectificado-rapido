import { HttpClient } from '@angular/common/http';
import { PLATFORM_ID, Injectable, Inject } from '@angular/core';
import { RootObject } from '../../shared/models/vehiculo-tipo.model';
import { isPlatformServer } from '@angular/common';
import { writeFile } from './file-writer.server';


@Injectable({
	providedIn: 'root'
})
export class DataSyncService {
	private readonly JSON_URL = '/assets/file.json';

	constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any) { }

	ngOnInit() {
		this.http.get(this.JSON_URL).subscribe(data => {
			console.log(data);
		});
	}

	checkAndUpdateData() {
		this.http.get<RootObject>(this.JSON_URL).subscribe(data => {

			for (const vehiculoTipo of data.VehiculoTipo) {
				vehiculoTipo.id = crypto.randomUUID();
				alert(vehiculoTipo.id);
			}
			if (isPlatformServer(this.platformId)) {

				writeFile(data);
			}
		});
	}
}
