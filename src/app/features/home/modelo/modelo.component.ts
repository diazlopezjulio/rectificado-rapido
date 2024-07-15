import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule, DataView } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
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
import { ModeloService } from '../../../core/services/modelo.service';
import { Modelo } from '../../../shared/models/modelo.models';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { VehiculoTipo } from '../../../shared/models/vehiculo-tipo.model';
import { VehiculoTipoService } from '../../../core/services/vehiculo-tipo.service';
import { MarcaService } from '../../../core/services/marca.service';
import { Marca } from '../../../shared/models/marca.model';

@Component({
	selector: 'app-modelo',
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
		ToastModule,
		InputTextareaModule,
		DropdownModule
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	templateUrl: './modelo.component.html',
	providers: [ModeloService, VehiculoTipoService, MarcaService, MessageService, ConfirmationService],
	styleUrl: './modelo.component.scss'
})
export class ModeloComponent {

	constructor(private titleService: TitleService,
		private vehiculoTipoService: VehiculoTipoService,
		private marcasService: MarcaService,
		private modeloService: ModeloService,
		private primengConfig: PrimeNGConfig,
		private messageService: MessageService,
		private confirmationService: ConfirmationService) { }

	titulo = 'Modelos';

	layout: 'list' | 'grid' = 'list';

	listadoModelos: Modelo[] = [];

	searchValue: string | undefined;

	@ViewChild('dv') dv!: DataView;

	modeloDialog: boolean = false;

	modelo!: Modelo;

	submitted: boolean = false;

	pressTimer!: ReturnType<typeof setTimeout>;

	todosTipoVehiculo: VehiculoTipo[] | undefined;

	tipoVehiculoSeleccionado: VehiculoTipo | undefined;

	todasMarcas: Marca[] | undefined;

	marcaSeleccionada: Marca | undefined;

	ngOnInit() {
		this.layout = 'list';
		this.titleService.changeTitle(this.titulo);

		this.primengConfig.ripple = true;
		this.obtenerTodasModelos();
		this.obtenerTodosVehiculosTipo();
		this.obtenerTodasMarcas();
	}

	filtroPalabras(event: Event, filterMatchMode: string = 'contains') {
		const target = event.target as HTMLInputElement;
		const filter = target.value;
		this.dv.filter(filter, filterMatchMode);
	}

	onMouseDown(item: Modelo) {
		this.modelo = item;
		this.pressTimer = setTimeout(() =>
			this.borrarModelo(item), 500);
	}

	onMouseUp() {
		clearTimeout(this.pressTimer);
		this.modelo = {};
		this.tipoVehiculoSeleccionado = undefined;
		this.marcaSeleccionada = undefined;
	}

	isSelected(item: Modelo): boolean {
		return this.modelo === item;
	}

	borrarModelo(modeloSeleccionado: Modelo) {
		this.confirmationService.confirm({
			message: '¿Estás seguro de que quieres eliminar ' + modeloSeleccionado.nombre + '?',
			header: 'Confirmar',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.modeloService.deleteModelo(modeloSeleccionado).subscribe(() => {
					this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Eliminado con exito', life: 3000 });
					this.obtenerTodasModelos();
				});

			},
			reject: () => {
				this.modelo = {};
				this.tipoVehiculoSeleccionado = undefined;
				this.marcaSeleccionada = undefined;
			}
		});
	}

	agregarModelo() {
		this.modelo = {};
		this.tipoVehiculoSeleccionado = undefined;
		this.marcaSeleccionada = undefined;
		this.submitted = false;
		this.modeloDialog = true;
	}

	editarModelo(modelop: Modelo) {
		this.modelo = { ...modelop };
		this.tipoVehiculoSeleccionado = this.todosTipoVehiculo?.find(tipo => tipo.id === modelop.tipoId);
		this.marcaSeleccionada = this.todasMarcas?.find(marca => marca.id === modelop.marcaId);
		this.modeloDialog = true;
	}

	ocultarDialogo() {
		this.modeloDialog = false;
		this.submitted = false;
	}

	async guardarModelo() {
		this.submitted = true;

		if (this.modelo.nombre?.trim() && this.tipoVehiculoSeleccionado !== undefined && this.modelo.abreviacion?.trim() && this.marcaSeleccionada !== undefined) {
			const idTipoVehiculo = this.manejarTipoVehiculo();
			this.modelo.tipoId = await idTipoVehiculo;
			const idMarca = this.manejarMarca();
			this.modelo.marcaId = await idMarca;
			if (this.modelo.id) {
				this.modeloService.updateModelo(this.modelo.id, this.modelo).subscribe(() => {
					this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Actualizado con exito', life: 3000 });
					this.obtenerTodasModelos();
				});
			} else {
				this.modeloService.addModelo(this.modelo).subscribe(() => {
					this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Agregado con exito', life: 3000 });
					this.obtenerTodasModelos();
				});
			}

			this.modeloDialog = false;
			this.modelo = {};
			this.tipoVehiculoSeleccionado = undefined;
			this.marcaSeleccionada = undefined;
		}
	}

	obtenerTodasModelos() {
		this.modeloService.getAllModelos().subscribe({
			next: (modelos) => {
				this.listadoModelos = modelos;
				this.modelo = {};
				this.tipoVehiculoSeleccionado = undefined;
				this.marcaSeleccionada = undefined;
			}
		});
	}

	obtenerTodosVehiculosTipo() {
		this.vehiculoTipoService.getAllVehiculoTipos().subscribe({
			next: (vehiculos) => {
				this.todosTipoVehiculo = vehiculos;
			}
		});
	}

	obtenerTodasMarcas() {
		this.marcasService.getAllMarcas().subscribe({
			next: (marcas) => {
				this.todasMarcas = marcas;
			}
		});
	}

	manejarTipoVehiculo(): Promise<number | undefined> {
		return new Promise((resolve, reject) => {
			let idTipoVehiculo = this.obtenerIdTipoVehiculo();
			if (idTipoVehiculo === undefined) {
				const tipo: VehiculoTipo = {
					nombre: (typeof this.tipoVehiculoSeleccionado === 'string') ? this.tipoVehiculoSeleccionado : this.tipoVehiculoSeleccionado?.nombre
				};

				this.vehiculoTipoService.addVehiculoTipo(tipo).subscribe({
					next: (tipo) => {
						console.log(tipo);
						idTipoVehiculo = tipo.id;
						this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se agregó con éxito ' + tipo.nombre, life: 3000 });
						this.obtenerTodosVehiculosTipo();
						resolve(idTipoVehiculo);
					},
					error: (err) => {
						console.error('Error al agregar tipo de vehículo:', err);
						reject(err);
					}
				});
			} else {
				resolve(idTipoVehiculo);
			}
		});
	}

	obtenerIdTipoVehiculo(): number | undefined {

		if (this.tipoVehiculoSeleccionado?.id !== undefined) {
			return this.tipoVehiculoSeleccionado.id;
		} else {
			return this.buscarIdTipoVehiculo();
		}

	}

	buscarIdTipoVehiculo(): number | undefined {
		if (typeof this.tipoVehiculoSeleccionado === 'string') {
			const tipoVehiculo = this.buscarNombreTipoVehiculo(this.tipoVehiculoSeleccionado);
			if (tipoVehiculo?.id !== undefined) {
				return tipoVehiculo.id;
			}
		}
		else {
			const tipoVehiculo = this.buscarNombreTipoVehiculo(this.tipoVehiculoSeleccionado?.nombre ?? '');
			if (tipoVehiculo?.id !== undefined) {
				return tipoVehiculo.id;
			}
		}
		return undefined;
	}

	buscarNombreTipoVehiculo(nombre: string): VehiculoTipo | undefined {
		return this.todosTipoVehiculo?.find(tipo => tipo.nombre?.toLowerCase() === nombre.toLowerCase());
	}


	manejarMarca(): Promise<number | undefined> {
		return new Promise((resolve, reject) => {
			let idMarca = this.obtenerIdMarca();
			if (idMarca === undefined) {
				const marca: Marca = {
					nombre: (typeof this.marcaSeleccionada === 'string') ? this.marcaSeleccionada : this.marcaSeleccionada?.nombre
				};

				this.marcasService.addMarca(marca).subscribe({
					next: (marc) => {
						console.log(marc);
						idMarca = marc.id;
						this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se agregó con éxito ' + marc.nombre, life: 3000 });
						this.obtenerTodasMarcas();
						resolve(idMarca);
					},
					error: (err) => {
						console.error('Error al agregar la marca no identificada:', err);
						reject(err);
					}
				});
			} else {
				resolve(idMarca);
			}
		});
	}

	obtenerIdMarca(): number | undefined {

		if (this.marcaSeleccionada?.id !== undefined) {
			return this.marcaSeleccionada.id;
		} else {
			return this.buscarIdMarca();
		}

	}

	buscarIdMarca(): number | undefined {
		if (typeof this.marcaSeleccionada === 'string') {
			const marca = this.buscarNombreMarca(this.marcaSeleccionada);
			if (marca?.id !== undefined) {
				return marca.id;
			}
		}
		else {
			const marca = this.buscarNombreMarca(this.marcaSeleccionada?.nombre ?? '');
			if (marca?.id !== undefined) {
				return marca.id;
			}
		}
		return undefined;
	}

	buscarNombreMarca(nombre: string): Marca | undefined {
		return this.todasMarcas?.find(marca => marca.nombre?.toLowerCase() === nombre.toLowerCase());
	}
}


