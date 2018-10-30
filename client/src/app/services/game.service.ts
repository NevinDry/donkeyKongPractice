import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { User } from '../models/User';
import { UserRegister } from "../models/UserRegister";
import { Game } from "../models/Game";

@Injectable()
export class GameService {
    constructor(private http: HttpClient) { }

    create(game: Game) {
        return this.http.post(environment.apiUrl + '/games/create', game)
            .catch((response) => {
                return Observable.throw(response.error);
            });
    }

    getAll(fromDate){
        return this.http.get(environment.apiUrl + '/games/getAll')
        .catch((response) => {
                return Observable.throw(response.error);
            });;
    }
}