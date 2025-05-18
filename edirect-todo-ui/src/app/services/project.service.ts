import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private baseUrl = 'http://localhost:8080/api/projects';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Project[]> {
    return this.http
      .get<Project[]>(this.baseUrl, { withCredentials: true })
      .pipe(catchError(err => throwError(() => err)));
  }

  create(name: string): Observable<Project> {
    return this.http
      .post<Project>(this.baseUrl, { name }, { withCredentials: true })
      .pipe(catchError(err => throwError(() => err)));
  }

  update(project: Project): Observable<Project> {
    return this.http
      .put<Project>(`${this.baseUrl}/${project.id}`, project, { withCredentials: true })
      .pipe(catchError(err => throwError(() => err)));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`, { withCredentials: true })
      .pipe(catchError(err => throwError(() => err)));
  }
}
