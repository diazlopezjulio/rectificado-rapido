import { Component, OnInit } from '@angular/core';
import { TitleService } from '../layout/services/title.services';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
	title: string = 'Dashboard';
	constructor(private titleService: TitleService) { }

	ngOnInit() {
		this.titleService.changeTitle(this.title);
	}
}
