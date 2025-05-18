import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-detail-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-detail-modal.component.html'
})
export class TaskDetailModalComponent implements OnChanges {
  @Input() task!: Task;
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() save  = new EventEmitter<Task>();

  editedTask!: Task;

  ngOnChanges(changes: SimpleChanges): void {
    const taskChange = changes['task'];
    const visChange  = changes['visible'];
    if ((taskChange && this.task) || (visChange && visChange.currentValue)) {
      this.editedTask = { ...this.task };
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onSave(): void {
    this.save.emit(this.editedTask);
    this.close.emit();
  }
}
