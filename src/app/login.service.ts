import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient, 

  ) {}

  login(username: string, password: string) {
    const body =  {
      "username":username, 
      "password":password
    } ;
    return this.http.post<any>('http://localhost:3000/login', body)
      .pipe(map(response => {
        return response;
      }));
  }
}
