import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAll(projectId: number): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${this.baseUrl}/projects/${projectId}/tasks`, {
        withCredentials: true
      })
      .pipe(catchError((err: HttpErrorResponse) => throwError(() => err)));
  }

  create(projectId: number, task: Partial<Task>): Observable<Task> {
    return this.http
      .post<Task>(
        `${this.baseUrl}/projects/${projectId}/tasks`,
        task,
        { withCredentials: true }
      )
      .pipe(catchError((err: HttpErrorResponse) => throwError(() => err)));
  }

  update(task: Task): Observable<Task> {
    return this.http
      .put<Task>(
        `${this.baseUrl}/tasks/${task.id}`,
        task,
        { withCredentials: true }
      )
      .pipe(catchError((err: HttpErrorResponse) => throwError(() => err)));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/tasks/${id}`, {
        withCredentials: true
      })
      .pipe(catchError((err: HttpErrorResponse) => throwError(() => err)));
  }
}
