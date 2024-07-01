import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { InstallPwaComponent } from './core/install-pwa/install-pwa.component';
import { HttpClientModule } from '@angular/common/http';
import { VehiculoTipoService } from './core/services/vehiculo-tipo.service';
import { VehiculoTipo } from './shared/models/vehiculo-tipo.model';
import { IndexedDBModule } from './indexeddb/indexeddb.module';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, InstallPwaComponent, HttpClientModule, IndexedDBModule],
	providers: [VehiculoTipoService],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'rectificado-rapido';

	vehiculoTipos: VehiculoTipo[] = [];

	constructor(private vehiculoTipoService: VehiculoTipoService) { }


	ngOnInit() {
		this.vehiculoTipoService.getAllVehiculoTipos().subscribe({
			next: (vehiculos) => {
				console.log(vehiculos);
			}
		});
		this.vehiculoTipoService.addVehiculoTipo({
			nombre: 'Vehiculo 1',
			abreviacion: 'V1',
			descripcion: 'Vehiculo 1',
			imagenUrl: 'https://via.placeholder.com/150'
		}).subscribe(data => {
			console.log(data);
		});

	}
}
