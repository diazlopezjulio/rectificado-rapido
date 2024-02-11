import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

export const routes: Routes = [
	{
		path: '', component: LayoutComponent,
		children: [
			{ path: '', component: AdminHomeComponent },
			{ path: 'dashboard', component: DashboardComponent },
			// Más rutas hijas específicas de la administración
		]
	}
];