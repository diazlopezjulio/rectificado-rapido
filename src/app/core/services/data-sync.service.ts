import { HttpClient } from '@angular/common/http';
import { PLATFORM_ID, Injectable, Inject } from '@angular/core';
import { RootObject } from '../../shared/models/vehiculo-tipo.model';
import { isPlatformServer } from '@angular/common';


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

			const jsonData = JSON.stringify(data, null, 2); // Convierte el objeto a una cadena JSON

			if (isPlatformServer(this.platformId)) {
				// eslint-disable-next-line
				const fs = require('fs');
				// eslint-disable-next-line
				const path = require('path');
				const filePath = path.join(process.cwd(), 'src', 'assets', 'file.json');
				fs.writeFile(filePath, jsonData, 'utf8', (err: Error | null) => {
					if (err) {
						console.log('Hubo un error al escribir el archivo JSON', err);
					} else {
						console.log('Archivo JSON guardado correctamente');
					}
				});
			}
		});
	}
}
