import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { TipoVehiculoComponent } from './tipo-vehiculo/tipo-vehiculo.component';

export const routes: Routes = [
	{
		path: '', component: LayoutComponent,
		children: [
			{ path: '', component: AdminHomeComponent },
			{ path: 'dashboard', component: DashboardComponent },
			{ path: 'tipo-vehiculo', component: TipoVehiculoComponent },
			// Más rutas hijas específicas de la administración
		]
	}
];