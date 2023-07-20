import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor() { }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  logout() {
    localStorage.clear();
  }


  login({ email, password }: any): Observable<any> {
    if (email === 'admin@gmail.com' && password === 'admin123') {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      return of({ name: 'Sagun Biswal', email: 'admin@gmail.com' });
    }
    return throwError(new Error('Failed to login'));
  }
}

