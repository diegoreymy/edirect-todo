import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { ErrorAlertComponent } from '../../shared/error-alert/error-alert.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CreateProjectComponent,
    ProjectCardComponent,
    ErrorAlertComponent
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  errorMessage: string | null = null;

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.projectService.getAll().subscribe({
      next: (p) => {
        this.projects = p;
        this.errorMessage = null;
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.message || err.message;
      }
    });
  }

  addProject(name: string): void {
    if (!name) return;
    this.projectService.create(name).subscribe({
      next: () => this.load(),
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.message || err.message;
      }
    });
  }

  editProject(project: Project): void {
    const name = prompt('New name', project.name);
    if (!name) return;
    this.projectService.update({ id: project.id, name }).subscribe({
      next: () => this.load(),
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.message || err.message;
      }
    });
  }

  deleteProject(project: Project): void {
    this.projectService.delete(project.id).subscribe({
      next: () => this.load(),
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.message || err.message;
      }
    });
  }

  addTask(event: { project: Project; description: string }): void {
    const { project, description } = event;
    if (!description) return;
    this.taskService.create(project.id, { description }).subscribe({
      next: () => this.load(),
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.message || err.message;
      }
    });
  }

  toggleTask(task: Task): void {
    const updatedTask: Task = {
      ...task,
      completed: !task.completed,
      finishDate: !task.completed ? new Date().toISOString() : undefined,
    };
    this.taskService.update(updatedTask).subscribe({
      next: () => this.load(),
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.message || err.message;
      },
    });
  }

  editTask(task: Task): void {
    const desc = prompt('New name', task.description);
    if (!desc) return;
    this.taskService.update({ ...task, description: desc }).subscribe({
      next: () => this.load(),
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.message || err.message;
      }
    });
  }

  deleteTask(task: Task): void {
    this.taskService.delete(task.id).subscribe({
      next: () => this.load(),
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.message || err.message;
      }
    });
  }
}