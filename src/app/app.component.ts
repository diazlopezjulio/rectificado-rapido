import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { InstallPwaComponent } from './core/install-pwa/install-pwa.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, InstallPwaComponent, HttpClientModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'rectificado-rapido';

	constructor() { }

	ngOnInit() {
		//vacio
	}
}
