import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DataView } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ProductService } from '../../admin/layout/services/productservice';
import { VehiculoTipo } from '../../../shared/models/vehiculo-tipo.model';
import { VehiculoTipoService } from '../../../core/services/vehiculo-tipo.service';
import { PrimeNGConfig, MessageService, ConfirmationService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { TitleService } from '../layout/services/title.services';

@Component({
	selector: 'app-inicio',
	standalone: true,
	imports: [
		DataViewModule,
		TagModule,
		RatingModule,
		ButtonModule,
		CommonModule,
		DropdownModule,
		ToolbarModule,
		AvatarModule,
		CardModule,
		TableModule,
		DialogModule,
		RippleModule,
		ToastModule,
		ConfirmDialogModule,
		InputTextModule,
		InputTextareaModule,
		RadioButtonModule,
		FormsModule,
		InputNumberModule,
		ToastModule
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	templateUrl: './inicio.component.html',
	providers: [ProductService, MessageService, ConfirmationService],
	styleUrl: './inicio.component.scss'
})
export class InicioComponent {
	titulo = 'Bienvenido a Rectificado Rápido';
	constructor(private titleService: TitleService, private vehiculoTipoService: VehiculoTipoService, private primengConfig: PrimeNGConfig, private messageService: MessageService, private confirmationService: ConfirmationService) { }

	layout: 'list' | 'grid' = 'list';

	products: VehiculoTipo[] = [];

	searchValue: string | undefined;


	ngOnInit() {
		this.layout = 'list';
		this.titleService.changeTitle(this.titulo);

		this.primengConfig.ripple = true;
		this.vehiculoTipoService.getAllVehiculoTipos().subscribe({
			next: (vehiculos) => {
				this.products = vehiculos;
			}
		});
	}

	@ViewChild('dv') dv!: DataView;

	productDialog: boolean = false;


	product!: VehiculoTipo;

	submitted: boolean = false;

	pressTimer: any;


	myfilter(event: Event, filterMatchMode: string = 'contains') {
		const target = event.target as HTMLInputElement; // Conversión de tipo
		const filter = target.value;
		this.dv.filter(filter, filterMatchMode);
	}

	onMouseDown(item: VehiculoTipo) {
		this.product = item;
		this.pressTimer = setTimeout(() =>
			this.borrarVheiculoTipo(item), 700); // Ajusta el tiempo según necesites
	}

	onMouseUp() {
		clearTimeout(this.pressTimer);
		this.product = {};
	}

	isSelected(item: VehiculoTipo): boolean {
		return this.product === item;
	}

	borrarVheiculoTipo(product: VehiculoTipo) {
		this.confirmationService.confirm({
			message: '¿Estás seguro de que quieres eliminar ' + product.nombre + '?',
			header: 'Confirmar',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.vehiculoTipoService.deleteVehiculoTipo(this.product).subscribe(data => {
					console.log(data);
					this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Eliminado con exito', life: 3000 });
					this.vehiculoTipoService.getAllVehiculoTipos().subscribe({
						next: (vehiculos) => {
							this.products = vehiculos;
						}
					});
				});

			}
		});
	}

	agregarTipoVehiculo() {
		this.product = {};
		this.submitted = false;
		this.productDialog = true;
	}

	editarTipoVehiculo(product: VehiculoTipo) {
		this.product = { ...product };
		this.productDialog = true;
	}


	ocultarDialogo() {
		this.productDialog = false;
		this.submitted = false;
	}

	guardarTipoVehiculo() {
		this.submitted = true;

		if (this.product.nombre?.trim()) {
			if (this.product.id) {
				this.vehiculoTipoService.updateVehiculoTipo(this.product.id, this.product).subscribe(data => {
					console.log(data);
					this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Actualizado con exito', life: 3000 });
					this.vehiculoTipoService.getAllVehiculoTipos().subscribe({
						next: (vehiculos) => {
							this.products = vehiculos;
						}
					});
				});
			} else {
				this.vehiculoTipoService.addVehiculoTipo(this.product).subscribe(data => {
					console.log(data);
					this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Agregado con exito', life: 3000 });
					this.vehiculoTipoService.getAllVehiculoTipos().subscribe({
						next: (vehiculos) => {
							this.products = vehiculos;
						}
					});
				});
			}

			this.productDialog = false;
			this.product = {};
		}
	}

}
