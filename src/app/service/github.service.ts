import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http
      .get<any>('https://dummyjson.com/users')
      .pipe(map((response) => response.users));
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`https://dummyjson.com/users/${id}`);
  }
}
