import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../environments/environment';
import { IAuthResponse, ICategory, IComment, IProduct, IUser } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ProviderService {
  private readonly api = environment.apiUrl;

  /** True while a login token is saved in the browser. */
  logged = !!localStorage.getItem('token');

  /** The product the user last opened, so the reviews page can show its name. */
  lastProduct: IProduct | null = null;

  constructor(private http: HttpClient) {}

  getCategories(): Promise<ICategory[]> {
    return firstValueFrom(this.http.get<ICategory[]>(`${this.api}/categories/`));
  }

  getCategory(id: number): Promise<ICategory> {
    return firstValueFrom(this.http.get<ICategory>(`${this.api}/categories/${id}/`));
  }

  getProducts(categoryId: number): Promise<IProduct[]> {
    return firstValueFrom(this.http.get<IProduct[]>(`${this.api}/categories/${categoryId}/products/`));
  }

  getComments(productId: number): Promise<IComment[]> {
    return firstValueFrom(this.http.get<IComment[]>(`${this.api}/products/${productId}/comments/`));
  }

  createComment(productId: number, content: string, rating: number, name: string): Promise<IComment> {
    return firstValueFrom(
      this.http.post<IComment>(`${this.api}/products/${productId}/comments/`, { content, rating, name }),
    );
  }

  async login(username: string, password: string): Promise<IAuthResponse> {
    const res = await firstValueFrom(
      this.http.post<IAuthResponse>(`${this.api}/login/`, { username, password }),
    );
    localStorage.setItem('token', res.token);
    this.logged = true;
    return res;
  }

  async logout(): Promise<void> {
    try {
      await firstValueFrom(this.http.post(`${this.api}/logout/`, {}));
    } finally {
      localStorage.removeItem('token');
      this.logged = false;
    }
  }

  createUser(username: string, password: string, email: string, name: string, surname: string): Promise<IUser> {
    return firstValueFrom(
      this.http.post<IUser>(`${this.api}/users/create/`, { username, password, email, name, surname }),
    );
  }

  /** Turns a backend error into one readable sentence for the forms. */
  errorMessage(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        return 'Cannot reach the server. Is the backend running on port 8000?';
      }
      if (err.error && typeof err.error === 'object') {
        const first = Object.values(err.error)[0];
        return Array.isArray(first) ? String(first[0]) : String(first);
      }
    }
    return 'Something went wrong. Please try again.';
  }
}
