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
import { SelectItem, PrimeNGConfig, MessageService, ConfirmationService } from 'primeng/api';
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

	sortOptions!: SelectItem[];
	sortOrder!: number;

	sortField!: string;


	ngOnInit() {
		this.layout = 'list';
		this.titleService.changeTitle(this.titulo);
		this.sortOptions = [
			{ label: 'Price High to Low', value: '!price' },
			{ label: 'Price Low to High', value: 'price' }
		];

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


	myfilter(event: Event, filterMatchMode: string = 'contains') {
		const target = event.target as HTMLInputElement; // Conversión de tipo
		const filter = target.value;
		this.dv.filter(filter, filterMatchMode);
	}

	onSortChange(event: Event) {
		const target = event.target as HTMLInputElement; // Conversión de tipo
		const value = target.value;

		if (value.indexOf('!') === 0) {
			this.sortOrder = -1;
			this.sortField = value.substring(1, value.length);
		} else {
			this.sortOrder = 1;
			this.sortField = value;
		}
	}

	openNew() {
		this.product = {};
		this.submitted = false;
		this.productDialog = true;
	}
	hideDialog() {
		this.productDialog = false;
		this.submitted = false;
	}

	saveProduct() {
		this.submitted = true;

		if (this.product.nombre?.trim()) {
			if (this.product.id) {
				this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
			} else {
				this.vehiculoTipoService.addVehiculoTipo({
					nombre: this.product.nombre,
					abreviacion: 'V1',
					descripcion: 'Vehiculo 1',
					imagenUrl: 'https://via.placeholder.com/150'
				}).subscribe(data => {
					console.log(data);
					this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
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
