import { Component, OnInit } from '@angular/core';
import { TitleService } from '../layout/services/title.services';

@Component({
	selector: 'app-admin-home',
	standalone: true,
	imports: [],
	templateUrl: './admin-home.component.html',
	styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent implements OnInit {
	title: string = 'Inicio';
	constructor(private titleService: TitleService) { }

	ngOnInit() {
		this.titleService.changeTitle(this.title);
	}
}
