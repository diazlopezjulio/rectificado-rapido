import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { InstallPwaComponent } from './core/install-pwa/install-pwa.component';
import { HttpClientModule } from '@angular/common/http';
import { VehiculoTipo } from './shared/models/vehiculo-tipo.model';
import { IndexedDBModule } from './indexeddb/indexeddb.module';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, InstallPwaComponent, HttpClientModule, IndexedDBModule],
	providers: [],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'rectificado-rapido';

	vehiculoTipos: VehiculoTipo[] = [];

	constructor() { }


	ngOnInit() {
	}
}
