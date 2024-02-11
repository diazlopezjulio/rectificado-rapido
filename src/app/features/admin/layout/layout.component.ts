import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TitleService } from './services/title.services';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-layout',
	standalone: true,
	imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
	title: string = '';
	isMenuOpen = false;

	constructor(private titleService: TitleService, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
		this.titleService.currentTitle.subscribe(title => this.title = title);
	}

	isNotCurrentRoute(route: string): boolean {
		return this.router.url !== route;
	}

	toggleMenu() {
		this.isMenuOpen = !this.isMenuOpen;
	}
}
