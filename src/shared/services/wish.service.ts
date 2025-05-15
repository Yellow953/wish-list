import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WishItem } from '../models/wishItem';

@Injectable({
  providedIn: 'root',
})
export class WishService {
  private apiUrl = 'http://3.28.183.184/public/api/wishlist';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
  }

  getWishes(): Observable<WishItem[]> {
    return this.http.get<WishItem[]>(this.apiUrl, this.getAuthHeaders());
  }

  createWish(wish: Partial<WishItem>): Observable<WishItem> {
    return this.http.post<WishItem>(this.apiUrl, wish, this.getAuthHeaders());
  }

  updateWish(wish: WishItem): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/${wish.id}`,
      {
        isComplete: !wish.isComplete,
      },
      this.getAuthHeaders()
    );
  }

  deleteWish(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      this.getAuthHeaders()
    );
  }
}
