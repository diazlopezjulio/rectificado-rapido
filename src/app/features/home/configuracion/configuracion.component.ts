import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { TitleService } from '../layout/services/title.services';
import { Configuracion } from '../../../shared/models/configuracion.model';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-configuracion',
	standalone: true,
	imports: [
		ButtonModule,
		CommonModule,
		CardModule,
		RippleModule,
		RouterModule
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	templateUrl: './configuracion.component.html',
	providers: [],
	styleUrl: './configuracion.component.scss'
})
export class ConfiguracionComponent {

	constructor(private titleService: TitleService,
		private primengConfig: PrimeNGConfig) { }

	titulo = 'Configuración';


	listadoConfiguracion: Configuracion[] = [];


	ngOnInit() {
		this.titleService.changeTitle(this.titulo);
		this.primengConfig.ripple = true;
		this.obtenerConfiguraciones();
	}

	obtenerConfiguraciones() {
		this.listadoConfiguracion = Configuracion.agregarConfiguracionesBase();
	}
}
