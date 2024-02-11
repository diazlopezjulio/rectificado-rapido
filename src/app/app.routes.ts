import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./features/home/home.routes').then(m => m.routes)
	},
	{
		path: '',
		loadChildren: () => import('./core/auth/auth.routes').then(m => m.routes)
	},
	{
		path: 'admin',
		loadChildren: () => import('./features/admin/admin.routes').then(m => m.routes)
	},
	{ path: '**', redirectTo: '', pathMatch: 'full' }
];
