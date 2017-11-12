import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackBarHelper {
	
	constructor(
		private snackBar: MatSnackBar
	) {}

	alert(message: string, action: string, duration ?:number) {
		return this.snackBar.open(message, action, {
			duration: duration || 2000,
		});
	}
}