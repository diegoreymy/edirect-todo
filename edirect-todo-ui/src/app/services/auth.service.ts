import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { UserDTO } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';
  private currentUser: UserDTO | null = null;

  constructor(private http: HttpClient) {}

  me(): Observable<UserDTO> {
    return this.http
      .get<UserDTO>(`${this.baseUrl}/me`, { withCredentials: true })
      .pipe(
        tap((user) => (this.currentUser = user)),
        catchError((err: HttpErrorResponse) => {
          this.currentUser = null;
          return throwError(() => err);
        })
      );
  }

  register(credentials: {
    username: string;
    password: string;
  }): Observable<UserDTO> {
    return this.http
      .post<UserDTO>(`${this.baseUrl}/register`, credentials, {
        withCredentials: true,
      })
      .pipe(
        tap((user) => (this.currentUser = user)),
        catchError((err) => throwError(() => err))
      );
  }

  login(credentials: {
    username: string;
    password: string;
  }): Observable<UserDTO> {
    return this.http
      .post<UserDTO>(`${this.baseUrl}/login`, credentials, {
        withCredentials: true,
      })
      .pipe(
        tap((user) => (this.currentUser = user)),
        catchError((err) => throwError(() => err))
      );
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.currentUser = null;
        }),
        catchError((err) => {
          this.currentUser = null;
          return throwError(() => err);
        })
      );
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  getUsername(): string {
    return this.currentUser?.username || '';
  }
}
