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

@Injectable()
export class AuthenticationService {

    user: User;

    constructor(private http: HttpClient) { }

    init(): void {
        this.isLoggedIn();
    }


    login(user: UserSignIn) {
        return this.http.post(environment.apiUrl + '/users/authenticate', user)
            .map((response: HttpResponseCusom) => {
                // login successful if there's a jwt token in the response
                if (response.data.user && response.data.user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(response.data.user));
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

    }

    getToken = function () {
        return localStorage['currentUser'];
    };

    isLoggedIn() {
        if (this.getToken()) {
            var exp = JSON.parse(this.getToken()).exp;
            if (exp < new Date().setMonth(new Date().getMonth() + 1)) {
                this.user = JSON.parse(this.getToken());
            }
        }
        else {
            this.logout();
        }
    }
}