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
import { MarcaService } from '../../../core/services/marca.service';
import { Marca } from '../../../shared/models/marca.model';

@Component({
	selector: 'app-marca',
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
	templateUrl: './marca.component.html',
	providers: [MarcaService, MessageService, ConfirmationService],
	styleUrl: './marca.component.scss'
})
export class MarcaComponent {

	constructor(private titleService: TitleService,
		private marcaService: MarcaService,
		private primengConfig: PrimeNGConfig,
		private messageService: MessageService,
		private confirmationService: ConfirmationService) { }

	titulo = 'Marcas';

	layout: 'list' | 'grid' = 'list';

	listadoMarcas: Marca[] = [];

	searchValue: string | undefined;

	@ViewChild('dv') dv!: DataView;

	marcaDialog: boolean = false;

	marca!: Marca;

	submitted: boolean = false;

	pressTimer!: ReturnType<typeof setTimeout>;

	ngOnInit() {
		this.layout = 'list';
		this.titleService.changeTitle(this.titulo);

		this.primengConfig.ripple = true;
		this.obtenerTodasMarcas();
	}

	filtroPalabras(event: Event, filterMatchMode: string = 'contains') {
		const target = event.target as HTMLInputElement;
		const filter = target.value;
		this.dv.filter(filter, filterMatchMode);
	}

	onMouseDown(item: Marca) {
		this.marca = item;
		this.pressTimer = setTimeout(() =>
			this.borrarMarca(item), 500);
	}

	onMouseUp() {
		clearTimeout(this.pressTimer);
		this.marca = {};
	}

	isSelected(item: Marca): boolean {
		return this.marca === item;
	}

	borrarMarca(marcaSeleccionado: Marca) {
		this.confirmationService.confirm({
			message: '¿Estás seguro de que quieres eliminar ' + marcaSeleccionado.nombre + '?',
			header: 'Confirmar',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.marcaService.deleteMarca(marcaSeleccionado).subscribe(() => {
					this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Eliminado con exito', life: 3000 });
					this.obtenerTodasMarcas();
				});

			},
			reject: () => {
				this.marca = {};
			}
		});
	}

	agregarMarca() {
		this.marca = {};
		this.submitted = false;
		this.marcaDialog = true;
	}

	editarMarca(product: Marca) {
		this.marca = { ...product };
		this.marcaDialog = true;
	}

	ocultarDialogo() {
		this.marcaDialog = false;
		this.submitted = false;
	}

	guardarMarca() {
		this.submitted = true;

		if (this.marca.nombre?.trim()) {
			if (this.marca.id) {
				this.marcaService.updateMarca(this.marca.id, this.marca).subscribe(() => {
					this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Actualizado con exito', life: 3000 });
					this.obtenerTodasMarcas();
				});
			} else {
				this.marcaService.addMarca(this.marca).subscribe(() => {
					this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Agregado con exito', life: 3000 });
					this.obtenerTodasMarcas();
				});
			}

			this.marcaDialog = false;
			this.marca = {};
		}
	}

	obtenerTodasMarcas() {
		this.marcaService.getAllMarcas().subscribe({
			next: (marcas) => {
				this.listadoMarcas = marcas;
				this.marca = {};
			}
		});
	}
}
