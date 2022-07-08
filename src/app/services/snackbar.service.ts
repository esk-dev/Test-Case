import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class SnackbarService {

  constructor(public MatSnackBar: MatSnackBar) { }
  
  open(message: string, action: string) {
    this.MatSnackBar.open(message, action, {
      duration: 5000,
    });
  }
}