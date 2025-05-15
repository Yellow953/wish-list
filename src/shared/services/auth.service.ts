import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://3.28.183.184/public/api';
  private user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data, {
      withCredentials: true,
    });
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data, {
      withCredentials: true,
    });
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.post(
      `${this.baseUrl}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  isAuthenticated(): boolean {
    return !!this.user.value || !!localStorage.getItem('token');
  }

  user$(): Observable<any> {
    return this.user.asObservable();
  }

  getCsrfToken() {
    return this.http.get(`http://3.28.183.184/public/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
  }

  loadUserFromToken(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return new Observable((observer) => observer.complete());
    }

    return this.getUser();
  }

  clearUser() {
    this.user.next(null);
  }
}
