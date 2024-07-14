import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule, DataView } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { Servicio } from '../../../shared/models/servicio.model';
import { ServicioService } from '../../../core/services/servicio.service';
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
	selector: 'app-servicio',
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
	templateUrl: './servicio.component.html',
	providers: [ServicioService, MessageService, ConfirmationService],
	styleUrl: './servicio.component.scss'
})
export class ServicioComponent {

	constructor(private titleService: TitleService,
		private servicioService: ServicioService,
		private primengConfig: PrimeNGConfig,
		private messageService: MessageService,
		private confirmationService: ConfirmationService) { }

	titulo = 'Servicios';

	layout: 'list' | 'grid' = 'list';

	listadoServicios: Servicio[] = [];

	searchValue: string | undefined;

	@ViewChild('dv') dv!: DataView;

	servicioDialog: boolean = false;

	servicio!: Servicio;

	submitted: boolean = false;

	pressTimer!: ReturnType<typeof setTimeout>;

	ngOnInit() {
		this.layout = 'list';
		this.titleService.changeTitle(this.titulo);

		this.primengConfig.ripple = true;
		this.obtenerTodosServicios();
	}

	filtroPalabras(event: Event, filterMatchMode: string = 'contains') {
		const target = event.target as HTMLInputElement;
		const filter = target.value;
		this.dv.filter(filter, filterMatchMode);
	}

	onMouseDown(item: Servicio) {
		this.servicio = item;
		this.pressTimer = setTimeout(() =>
			this.borrarServicio(item), 500);
	}

	onMouseUp() {
		clearTimeout(this.pressTimer);
		this.servicio = {};
	}

	isSelected(item: Servicio): boolean {
		return this.servicio === item;
	}

	borrarServicio(servicioSeleccionado: Servicio) {
		this.confirmationService.confirm({
			message: '¿Estás seguro de que quieres eliminar ' + servicioSeleccionado.nombre + '?',
			header: 'Confirmar',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.servicioService.deleteServicio(servicioSeleccionado).subscribe(() => {
					this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Eliminado con exito', life: 3000 });
					this.obtenerTodosServicios();
				});

			},
			reject: () => {
				this.servicio = {};
			}
		});
	}

	agregarServicio() {
		this.servicio = {};
		this.submitted = false;
		this.servicioDialog = true;
	}

	editarServicio(product: Servicio) {
		this.servicio = { ...product };
		this.servicioDialog = true;
	}


	ocultarDialogo() {
		this.servicioDialog = false;
		this.submitted = false;
	}

	guardarServicio() {
		this.submitted = true;
		console.log(this.servicio);
		if (this.servicio.nombre?.trim() && this.servicio.abreviacion?.trim()) {
			if (this.servicio.id) {
				this.servicioService.updateServicio(this.servicio.id, this.servicio).subscribe(() => {
					this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Actualizado con exito', life: 3000 });
					this.obtenerTodosServicios();
				}, (error) => {
					console.log(error);
				});
			} else {
				this.servicioService.addServicio(this.servicio).subscribe(() => {
					this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Agregado con exito', life: 3000 });
					this.obtenerTodosServicios();
				}, (error) => {
					console.log(error);
				});
			}

			this.servicioDialog = false;
			this.servicio = {};
		}
	}

	obtenerTodosServicios() {
		this.servicioService.getAllServicios().subscribe({
			next: (servicios) => {
				this.listadoServicios = servicios;
				console.log(this.listadoServicios);
				this.servicio = {};
			}
		});
	}

}
