import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';
import { UserSignIn } from "../models/UserSignIn";
import { User } from "../models/User";
import { HttpResponseCusom } from "../models/HttpResponseCusom";
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

    user: User;

    constructor(private http: HttpClient, public router: Router) { }

    init(): void {
        if(this.isLoggedIn()){
            this.user = JSON.parse(this.getToken());
        }
    }


    login(user: UserSignIn) {
        return this.http.post(environment.apiUrl + '/users/authenticate', user)
            .map((response: HttpResponseCusom) => {
                // login successful if there's a jwt token in the response
                if (response.data.name && response.data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(response.data));
                    this.init();
                }
                return response;
            })
            .catch((response) => {
                return Observable.throw(response.error);
            });
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.user = null;
        this.router.navigate(['home']);
    }

    getToken = function () {
        return localStorage['currentUser'];
    };

    isLoggedIn() {
        let token = this.getToken();
        if (token) {
            var exp = JSON.parse(token).exp;
            var date = new Date().getTime();
            if (date < exp) {
                return true;
            }else{
                return false;
            }
        }
        else {
            this.logout();
            return false;
        }
    }
}