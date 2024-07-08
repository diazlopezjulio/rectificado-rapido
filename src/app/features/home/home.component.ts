import { Component, ViewChild } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { Table, TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { Product } from '../../shared/models/vehiculo-tipo.model';
import { ProductService } from '../admin/layout/services/productservice';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
	selector: 'app-home',
	standalone: true,
	imports: [ToolbarModule, AvatarModule, CardModule, TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, FormsModule, InputNumberModule],
	providers: [ProductService, MessageService, ConfirmationService],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent {
	showSearch: boolean = false; // Controla la visibilidad del campo de búsqueda

	toggleSearch() {
		this.showSearch = !this.showSearch; // Cambia el estado de visibilidad
	}

	productDialog: boolean = false;

	products!: Product[];

	product!: Product;

	selectedProducts!: Product[] | null;

	submitted: boolean = false;

	statuses!: any[];

	constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

	ngOnInit() {
		this.productService.getProducts().then((data) => (this.products = data));

		this.statuses = [
			{ label: 'INSTOCK', value: 'instock' },
			{ label: 'LOWSTOCK', value: 'lowstock' },
			{ label: 'OUTOFSTOCK', value: 'outofstock' }
		];
	}

	openNew() {
		this.product = {};
		this.submitted = false;
		this.productDialog = true;
	}

	deleteSelectedProducts() {
		this.confirmationService.confirm({
			message: 'Are you sure you want to delete the selected products?',
			header: 'Confirm',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
				this.selectedProducts = null;
				this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
			}
		});
	}

	editProduct(product: Product) {
		this.product = { ...product };
		this.productDialog = true;
	}

	deleteProduct(product: Product) {
		this.confirmationService.confirm({
			message: 'Are you sure you want to delete ' + product.name + '?',
			header: 'Confirm',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.products = this.products.filter((val) => val.id !== product.id);
				this.product = {};
				this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
			}
		});
	}

	hideDialog() {
		this.productDialog = false;
		this.submitted = false;
	}

	saveProduct() {
		this.submitted = true;

		if (this.product.name?.trim()) {
			if (this.product.id) {
				this.products[this.findIndexById(this.product.id)] = this.product;
				this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
			} else {
				this.product.id = this.createId();
				this.product.image = 'product-placeholder.svg';
				this.products.push(this.product);
				this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
			}

			this.products = [...this.products];
			this.productDialog = false;
			this.product = {};
		}
	}

	findIndexById(id: string): number {
		let index = -1;
		for (let i = 0; i < this.products.length; i++) {
			if (this.products[i].id === id) {
				index = i;
				break;
			}
		}

		return index;
	}

	createId(): string {
		let id = '';
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < 5; i++) {
			id += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		return id;
	}

	getSeverity(status: string | undefined): 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' | undefined {
		switch (status) {
			case 'INSTOCK':
				return 'success';
			case 'LOWSTOCK':
				return 'warning';
			case 'OUTOFSTOCK':
				return 'danger';
			default:
				return 'info';
		}
	}

	@ViewChild('dt') dt!: Table;



	filterInput(event: Event): void {
		const target = event.target as HTMLInputElement; // Conversión de tipo
		console.log(target.value);
		this.dt.filterGlobal(target.value, 'contains'); // Llamada a la función con el valor
	}
}
