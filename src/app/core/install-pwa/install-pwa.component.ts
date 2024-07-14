import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-install-pwa',
	standalone: true,
	imports: [DialogModule, ButtonModule],
	templateUrl: './install-pwa.component.html',
	styleUrl: './install-pwa.component.scss'
})
export class InstallPwaComponent implements OnInit {
	deferredPrompt: any;
	displayModal = false;

	constructor(@Inject(PLATFORM_ID) private platformId: any) { }

	ngOnInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			window.addEventListener('beforeinstallprompt', (e) => {
				e.preventDefault();
				this.deferredPrompt = e;
				const lastPromptTime = localStorage.getItem('lastPromptTime');
				const now = new Date();
				const daysSinceLastPrompt = lastPromptTime ? (now.getTime() - new Date(lastPromptTime).getTime()) / (1000 * 3600 * 24) : null;

				// Mostrar el modal solo si han pasado 30 días o nunca se ha mostrado
				if (daysSinceLastPrompt === null || daysSinceLastPrompt > 30) {
					this.displayModal = true;
				}

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
		const now = new Date();
		localStorage.setItem('lastPromptTime', now.toString());
		this.displayModal = false;  // Cierra el modal si el usuario cancela
	}

	closeModal(): void {
		this.displayModal = false;  // Cierra el modal si el usuario cancela
	}
}
