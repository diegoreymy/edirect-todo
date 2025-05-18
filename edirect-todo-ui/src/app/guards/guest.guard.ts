import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    console.log('GuestGuard');
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/projects']);
      return of(false);
    }
    return this.auth.me().pipe(
      map(user => {
        this.router.navigate(['/projects']);
        return false;
      }),
      catchError(() => {
        return of(true);
      })
    );
  }
}
