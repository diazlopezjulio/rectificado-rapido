import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
	selector: 'app-install-pwa',
	standalone: true,
	imports: [],
	templateUrl: './install-pwa.component.html',
	styleUrl: './install-pwa.component.scss'
})
export class InstallPwaComponent implements OnInit {
	deferredPrompt: any;
	showButton = false;

	constructor(@Inject(PLATFORM_ID) private platformId: any) { }

	ngOnInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			console.log(1344);
			window.addEventListener('beforeinstallprompt', (e) => {
				e.preventDefault();
				this.deferredPrompt = e;
				this.showButton = true;
			});
		}
	}

	addToHomeScreen(): void {
		if (isPlatformBrowser(this.platformId) && this.deferredPrompt) {
			this.deferredPrompt.prompt();
			this.deferredPrompt.userChoice.then((choiceResult: any) => {
				if (choiceResult.outcome === 'accepted') {
					console.log('User accepted the A2HS prompt');
				} else {
					console.log('User dismissed the A2HS prompt');
				}
				this.deferredPrompt = null;
			});
		}
	}

	cancelInstall(): void {
		this.showButton = false;  // Cierra el modal si el usuario cancela
	}
}
