import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const routes: Routes = [
	// Define la ruta de la página principal
	{ path: '', component: HomeComponent, pathMatch: 'full' },
	// Añade aquí otras rutas
];