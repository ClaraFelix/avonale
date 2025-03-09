import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  private apiUrl = 'https://api.github.com/repositories';

  constructor(private http: HttpClient) {}

  getRepositories(page: number): Observable<any> {
    const url = `${this.apiUrl}?per_page=30&page=${page}&sort=stars`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error('Erro ao buscar repositórios:', error);
        throw error;
      })
    );
  }
}
