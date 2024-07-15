import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { InicioComponent } from './inicio/inicio.component';
import { ServicioComponent } from './servicio/servicio.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { TipoVehiculoComponent } from './tipo-vehiculo/tipo-vehiculo.component';
import { MarcaComponent } from './marca/marca.component';
import { ModeloComponent } from './modelo/modelo.component';

export const routes: Routes = [
	{
		path: '', component: LayoutComponent,
		children: [
			{ path: '', component: InicioComponent },
			{ path: 'servicios', component: ServicioComponent },
			{ path: 'configuracion', component: ConfiguracionComponent },
			{ path: 'tipo-vehiculo', component: TipoVehiculoComponent },
			{ path: 'marcas', component: MarcaComponent },
			{ path: 'modelos', component: ModeloComponent },
		]
	}
];