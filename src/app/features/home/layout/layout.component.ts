import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TitleService } from './services/title.services';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
	selector: 'app-layout',
	standalone: true,
	imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ToolbarModule, AvatarModule, MenubarModule,
		PanelModule,
		ButtonModule,
		CardModule],
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
	title: string = '';
	isSubMenuOpen = false;
	isMenuOpen = false;
	isMobileSubMenuOpen = true;
	showSearch: boolean = false; // Controla la visibilidad del campo de búsqueda

	toggleSearch() {
		this.showSearch = !this.showSearch; // Cambia el estado de visibilidad
	}

	constructor(private titleService: TitleService, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
		this.titleService.currentTitle.subscribe(title => this.title = title);
	}

	isNotCurrentRoute(route: string): boolean {
		return this.router.url !== route;
	}

	toggleSubMenu() {
		this.isSubMenuOpen = !this.isSubMenuOpen;
	}

	toggleMenu() {
		this.isMenuOpen = !this.isMenuOpen;
	}

	toggleMobileSubMenuOpen() {
		this.isMobileSubMenuOpen = !this.isMobileSubMenuOpen;
	}


}
