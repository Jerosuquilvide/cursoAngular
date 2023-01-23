import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;
  
  constructor(
    private http : HttpClient
  ) { }

    login(email:string, password:string){
      return this.http.post<Auth>(`${this.apiUrl}/login`, {email,password});
    }

    profile(token:string){
      return this.http.get<User>(`${this.apiUrl}/profile`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    fetchLoginAndProfile(): Observable<User> {
      return this.login('jero@email.com','123123')
      .pipe(switchMap(
        (token) => this.profile(token.access_token))    
      );
      
    }
}
