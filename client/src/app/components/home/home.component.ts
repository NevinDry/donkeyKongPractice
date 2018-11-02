import { Component, OnInit } from '@angular/core';
import { GameService } from "../../services/game.service";
import { HttpResponseCusom } from "../../models/HttpResponseCusom";
import { Game } from "../../models/Game";
import { AlertService } from "../../services/alert.service";
import { AuthenticationService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private authService: AuthenticationService) 
  { }

  ngOnInit() {
  }

}
