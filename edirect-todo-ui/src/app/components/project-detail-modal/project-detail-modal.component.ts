import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-detail-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-detail-modal.component.html'
})
export class ProjectDetailModalComponent implements OnChanges {
  @Input() project!: Project;
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() save  = new EventEmitter<Project>();

  editedProject!: Project;

  ngOnChanges(changes: SimpleChanges): void {
    const projChange = changes['project'];
    const visChange  = changes['visible'];
    if ((projChange && this.project) || (visChange && visChange.currentValue)) {
      this.editedProject = { ...this.project };
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onSave(): void {
    this.save.emit(this.editedProject);
    this.close.emit();
  }
}
