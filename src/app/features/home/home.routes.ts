import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { InicioComponent } from './inicio/inicio.component';
import { ServicioComponent } from './servicio/servicio.component';

export const routes: Routes = [
	{
		path: '', component: LayoutComponent,
		children: [
			{ path: '', component: InicioComponent },
			{ path: 'servicios', component: ServicioComponent },
		]
	}
];