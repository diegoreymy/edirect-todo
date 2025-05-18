import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TooltipComponent } from '../../shared/tooltip/tooltip.component';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import { ProjectDetailModalComponent } from '../project-detail-modal/project-detail-modal.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskItemComponent, TooltipComponent, ProjectDetailModalComponent],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Output() addTask = new EventEmitter<{ project: Project; name: string }>();
  @Output() toggleTask = new EventEmitter<Task>();
  @Output() editProject = new EventEmitter<Project>();
  @Output() deleteProject = new EventEmitter<Project>();
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();

  newTask = '';
  showDetail = false;

  getPendingTasks(): Task[] {
    return this.project.tasks?.filter((t) => !t.completed) ?? [];
  }

  getDoneTasks(): Task[] {
    return this.project.tasks?.filter((t) => t.completed) ?? [];
  }

  onAddTask(): void {
    const name = this.newTask.trim();
    if (!name) return;
    this.addTask.emit({ project: this.project, name });
    this.newTask = '';
  }

  onToggle(task: Task): void {
    this.toggleTask.emit(task);
  }

  openDetail(event: Event): void {
    event.preventDefault();
    this.showDetail = true;
  }

  closeDetail(): void {
    this.showDetail = false;
  }

  onSaveProject(updated: Project): void {
    this.editProject.emit(updated);
    this.showDetail = false;
  }

  onDeleteProject(): void {
    this.deleteProject.emit(this.project);
  }

  onEdit(task: Task): void {
    this.editTask.emit(task);
  }

  onDelete(task: Task): void {
    this.deleteTask.emit(task);
  }
}
