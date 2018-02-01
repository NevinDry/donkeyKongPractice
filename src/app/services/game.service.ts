import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
import { environment } from '../../environments/environment';
import { User } from '../models/User';
import { UserRegister } from "../models/UserRegister";
 
@Injectable()
export class GameService {
    constructor(private http: HttpClient) { }
 
    test() {
        return this.http.get(environment.apiUrl + '/games/test');
    }
}