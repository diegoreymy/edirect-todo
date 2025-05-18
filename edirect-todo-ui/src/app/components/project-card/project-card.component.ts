import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TooltipComponent } from '../../shared/tooltip/tooltip.component';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskItemComponent, TooltipComponent],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Output() addTask = new EventEmitter<{
    project: Project;
    description: string;
  }>();
  @Output() toggleTask = new EventEmitter<Task>();
  @Output() editProject = new EventEmitter<Project>();
  @Output() deleteProject = new EventEmitter<Project>();
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();

  newTask = '';

  getPendingTasks(): Task[] {
    return this.project?.tasks?.filter((t) => !t.completed) ?? [];
  }

  getDoneTasks(): Task[] {
    return this.project?.tasks?.filter((t) => t.completed) ?? [];
  }

  onAddTask(): void {
    const desc = this.newTask.trim();
    if (!desc) return;
    this.addTask.emit({ project: this.project, description: desc });
    this.newTask = '';
  }

  onToggle(task: Task): void {
    this.toggleTask.emit(task);
  }

  onEditProject(): void {
    this.editProject.emit(this.project);
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
