import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
import { environment } from '../../environments/environment';
import { User } from '../models/User';
import { UserRegister } from "../models/UserRegister";
 
@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
 
    getAll() {
        return this.http.get<User[]>(environment.apiUrl + '/users');
    }
 
    getById(_id: string) {
        return this.http.get(environment.apiUrl + '/users/' + _id);
    }
 
    create(user: UserRegister) {
        return this.http.post(environment.apiUrl + '/users/register', user);
    }
}