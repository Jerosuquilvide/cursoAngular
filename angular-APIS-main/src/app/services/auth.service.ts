import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { switchMap,tap } from 'rxjs/operators';
import { TokenService } from './token.service';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;
  
  constructor(
    private http : HttpClient,
    private tokenService : TokenService
  ) { }

    login(email:string, password:string){
      return this.http.post<Auth>(`${this.apiUrl}/login`, {email,password})
      .pipe(
        tap(res => this.tokenService.saveToken(res.access_token))
      )
      ;
    }

    profile(){
      return this.http.get<User>(`${this.apiUrl}/profile`,{
        // headers: {
        //   Authorization: `Bearer ${token}`
        // }
      });
    }

    fetchLoginAndProfile(): Observable<User> {
      return this.login('jero@email.com','123123')
      .pipe(switchMap(
        () => this.profile())    
      );
      
    }
}
