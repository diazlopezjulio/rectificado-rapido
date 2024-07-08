import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { InicioComponent } from './inicio/inicio.component';

export const routes: Routes = [
	{
		path: '', component: LayoutComponent, pathMatch: 'full',
		children: [
			{ path: '', component: InicioComponent },
		]
	}
];