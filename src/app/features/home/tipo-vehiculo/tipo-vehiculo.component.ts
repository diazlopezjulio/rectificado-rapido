import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule, DataView } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { VehiculoTipo } from '../../../shared/models/vehiculo-tipo.model';
import { VehiculoTipoService } from '../../../core/services/vehiculo-tipo.service';
import { PrimeNGConfig, MessageService, ConfirmationService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TitleService } from '../layout/services/title.services';

@Component({
	selector: 'app-tipo-vehiculo',
	standalone: true,
	imports: [
		DataViewModule,
		ButtonModule,
		CommonModule,
		ToolbarModule,
		CardModule,
		DialogModule,
		RippleModule,
		ToastModule,
		ConfirmDialogModule,
		InputTextModule,
		FormsModule,
		ToastModule
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	templateUrl: './tipo-vehiculo.component.html',
	providers: [VehiculoTipoService, MessageService, ConfirmationService],
	styleUrl: './tipo-vehiculo.component.scss'
})
export class TipoVehiculoComponent {

	constructor(private titleService: TitleService,
		private vehiculoTipoService: VehiculoTipoService,
		private primengConfig: PrimeNGConfig,
		private messageService: MessageService,
		private confirmationService: ConfirmationService) { }

	titulo = 'Bienvenido a Rectificado Rápido';

	layout: 'list' | 'grid' = 'list';

	listadoVehiculosTipos: VehiculoTipo[] = [];

	searchValue: string | undefined;

	@ViewChild('dv') dv!: DataView;

	vehiculoTipoDialog: boolean = false;

	vehiculoTipo!: VehiculoTipo;

	submitted: boolean = false;

	pressTimer!: ReturnType<typeof setTimeout>;

	ngOnInit() {
		this.layout = 'list';
		this.titleService.changeTitle(this.titulo);

		this.primengConfig.ripple = true;
		this.obtenerTodosVehiculosTipo();
	}

	filtroPalabras(event: Event, filterMatchMode: string = 'contains') {
		const target = event.target as HTMLInputElement;
		const filter = target.value;
		this.dv.filter(filter, filterMatchMode);
	}

	onMouseDown(item: VehiculoTipo) {
		this.vehiculoTipo = item;
		this.pressTimer = setTimeout(() =>
			this.borrarVehiculoTipo(item), 500);
	}

	onMouseUp() {
		clearTimeout(this.pressTimer);
		this.vehiculoTipo = {};
	}

	isSelected(item: VehiculoTipo): boolean {
		return this.vehiculoTipo === item;
	}

	borrarVehiculoTipo(vehiculoTipoSeleccionado: VehiculoTipo) {
		this.confirmationService.confirm({
			message: '¿Estás seguro de que quieres eliminar ' + vehiculoTipoSeleccionado.nombre + '?',
			header: 'Confirmar',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.vehiculoTipoService.deleteVehiculoTipo(vehiculoTipoSeleccionado).subscribe(() => {
					this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Eliminado con exito', life: 3000 });
					this.obtenerTodosVehiculosTipo();
				});

			},
			reject: () => {
				this.vehiculoTipo = {};
			}
		});
	}

	agregarTipoVehiculo() {
		this.vehiculoTipo = {};
		this.submitted = false;
		this.vehiculoTipoDialog = true;
	}

	editarTipoVehiculo(product: VehiculoTipo) {
		this.vehiculoTipo = { ...product };
		this.vehiculoTipoDialog = true;
	}

	ocultarDialogo() {
		this.vehiculoTipoDialog = false;
		this.submitted = false;
	}

	guardarTipoVehiculo() {
		this.submitted = true;

		if (this.vehiculoTipo.nombre?.trim()) {
			if (this.vehiculoTipo.id) {
				this.vehiculoTipoService.updateVehiculoTipo(this.vehiculoTipo.id, this.vehiculoTipo).subscribe(() => {
					this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Actualizado con exito', life: 3000 });
					this.obtenerTodosVehiculosTipo();
				});
			} else {
				this.vehiculoTipoService.addVehiculoTipo(this.vehiculoTipo).subscribe(() => {
					this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Agregado con exito', life: 3000 });
					this.obtenerTodosVehiculosTipo();
				});
			}

			this.vehiculoTipoDialog = false;
			this.vehiculoTipo = {};
		}
	}

	obtenerTodosVehiculosTipo() {
		this.vehiculoTipoService.getAllVehiculoTipos().subscribe({
			next: (vehiculos) => {
				this.listadoVehiculosTipos = vehiculos;
				this.vehiculoTipo = {};
			}
		});
	}
}
