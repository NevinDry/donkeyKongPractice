import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Game } from '../../models/Game';
import { AlertService } from '../../services/alert.service';
import { GameService } from '../../services/game.service';
import { HttpResponseCusom } from '../../models/HttpResponseCusom';

@Component({
  selector: 'app-game-stat',
  templateUrl: './game-stat.component.html',
  styleUrls: ['./game-stat.component.css']
})
export class GameStatComponent implements OnInit {

  private allGames: Game[];
  private wildBarrelDeaths;

  constructor(private gameService:GameService, private alertService: AlertService) { }

  ngOnInit() {
    this.gameService.getAll(new Date()).subscribe(
      (response: HttpResponseCusom) => {
        this.allGames = response.data;
        this.calculateStats();
      },
      (error: HttpResponseCusom) => {
        this.alertService.error(error.message || "An error has occured", true);
      });
  }

  public calculateStats(){
    this.wildBarrelDeaths = _.sumBy(this.allGames, function(games: Game) { return games.firstDeath.wild; });
    console.log(this.wildBarrelDeaths);
  }

}
