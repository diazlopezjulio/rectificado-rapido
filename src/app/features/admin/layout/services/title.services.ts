import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TitleService {
	private title = new BehaviorSubject('Dashboard');
	currentTitle = this.title.asObservable();

	constructor() { }

	changeTitle(title: string) {
		setTimeout(() => this.title.next(title));
	}
}