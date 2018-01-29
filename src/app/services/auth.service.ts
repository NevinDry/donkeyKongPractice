import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
import { environment } from '../../environments/environment';
import { UserSignIn } from "../models/UserSignIn";
 
@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }
 
    login(user: UserSignIn) {
        return this.http.post<any>(environment.apiUrl + '/users/authenticate', user)
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
 
                return user;
            });
    }

 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}