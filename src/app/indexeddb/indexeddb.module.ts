// indexeddb.module.ts
import { NgModule } from '@angular/core';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';

const dbConfig: DBConfig = {
	name: 'MiBaseDeDatos2',
	version: 2,
	objectStoresMeta: [
		{
			store: 'vehiculoTipo',
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [
				{ name: 'nombre', keypath: 'nombre', options: { unique: false } },
				{ name: 'abreviacion', keypath: 'abreviacion', options: { unique: false } },
				{ name: 'descripcion', keypath: 'descripcion', options: { unique: false } },
				{ name: 'imagenUrl', keypath: 'imagenUrl', options: { unique: false } }
			]
		},
		// Agrega más stores según sea necesario
		{
			store: 'servicio',
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [
				{ name: 'nombre', keypath: 'nombre', options: { unique: false } },
				{ name: 'abreviacion', keypath: 'abreviacion', options: { unique: false } },
				{ name: 'descripcion', keypath: 'descripcion', options: { unique: false } },
				{ name: 'imagenUrl', keypath: 'imagenUrl', options: { unique: false } }
			]
		},
		{
			store: 'marca',
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [
				{ name: 'nombre', keypath: 'nombre', options: { unique: false } },
				{ name: 'abreviacion', keypath: 'abreviacion', options: { unique: false } },
				{ name: 'descripcion', keypath: 'descripcion', options: { unique: false } },
				{ name: 'imagenUrl', keypath: 'imagenUrl', options: { unique: false } }
			]
		},
		{
			store: 'modelo',
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [
				{ name: 'marcaId', keypath: 'marcaId', options: { unique: false } },
				{ name: 'tipoId', keypath: 'tipoId', options: { unique: false } },
				{ name: 'nombre', keypath: 'nombre', options: { unique: false } },
				{ name: 'abreviacion', keypath: 'abreviacion', options: { unique: false } },
				{ name: 'descripcion', keypath: 'descripcion', options: { unique: false } },
				{ name: 'imagenUrl', keypath: 'imagenUrl', options: { unique: false } }
			]
		}
	]
};

@NgModule({
	imports: [NgxIndexedDBModule.forRoot(dbConfig)],
	exports: [NgxIndexedDBModule]
})
export class IndexedDBModule { }
