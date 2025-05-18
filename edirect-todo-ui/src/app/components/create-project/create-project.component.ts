import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-project.component.html'
})
export class CreateProjectComponent {
  projectName = '';
  @Output() create = new EventEmitter<string>();

  onCreate(): void {
    const name = this.projectName.trim();
    if (!name) return;
    this.create.emit(name);
    this.projectName = '';
  }
}
