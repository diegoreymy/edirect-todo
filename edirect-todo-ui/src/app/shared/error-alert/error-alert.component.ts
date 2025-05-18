import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="message" class="alert alert-danger">
      {{ message }}
    </div>
  `
})
export class ErrorAlertComponent {
  @Input() message: string | null = null;
}