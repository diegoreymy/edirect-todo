import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorAlertComponent } from '../../shared/error-alert/error-alert.component';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ErrorAlertComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  credentials = { username: '', password: '' };
  errorMessage: string | null = null;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  register(): void {
    this.errorMessage = null;
    this.auth.register(this.credentials).pipe(
      switchMap(() => this.auth.login(this.credentials))
    ).subscribe({
      next: () => {
        this.router.navigate(['/projects']);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.message || err.message;
      }
    });
  }
}
