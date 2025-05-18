import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { TaskDetailModalComponent } from '../task-detail-modal/task-detail-modal.component';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  imports: [CommonModule, TaskDetailModalComponent],
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Input() finished = false;
  @Output() toggle = new EventEmitter<Task>();
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();

  showDetail = false;

  onToggle(): void {
    this.toggle.emit(this.task);
  }

  onEdit(): void {
    this.edit.emit(this.task);
  }

  onDelete(): void {
    this.delete.emit(this.task);
  }

  openDetail(event: Event) {
    event.preventDefault();
    this.showDetail = true;
  }

  closeDetail() {
    this.showDetail = false;
  }

  onSave(updatedTask: Task): void {
    this.edit.emit(updatedTask);
  }
}
