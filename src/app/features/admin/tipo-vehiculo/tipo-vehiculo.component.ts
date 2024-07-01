import { Component } from '@angular/core';
import { TitleService } from '../layout/services/title.services';
import { IndexedDBModule } from '../../../indexeddb/indexeddb.module';
import { VehiculoTipoService } from '../../../core/services/vehiculo-tipo.service';
import { VehiculoTipo } from '../../../shared/models/vehiculo-tipo.model';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
	selector: 'app-tipo-vehiculo',
	standalone: true,
	imports: [IndexedDBModule, ButtonModule, RippleModule],
	providers: [VehiculoTipoService],
	templateUrl: './tipo-vehiculo.component.html',
	styleUrl: './tipo-vehiculo.component.scss'
})
export class TipoVehiculoComponent {
	title: string = 'Tipo de vehículo';
	vehiculosTipos: VehiculoTipo[] = [];

	constructor(private titleService: TitleService, private vehiculoTipoService: VehiculoTipoService) { }

	ngOnInit() {
		this.titleService.changeTitle(this.title);
		this.vehiculoTipoService.getAllVehiculoTipos().subscribe({
			next: (vehiculos) => {
				this.vehiculosTipos = vehiculos;
			}
		});
	}
}
