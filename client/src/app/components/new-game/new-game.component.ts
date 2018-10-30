import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';

import { ModalWindowComponent } from "../modal-window/modal-window.component";
import { Stage } from "../../models/Stage";
import { ALLSTAGES } from "../../data/AllStages"
import { Game } from "../../models/Game";
import { Death } from "../../models/Death";
import { StageType } from "../../models/enums/StageType";
import { GameService } from "../../services/game.service";
import { HttpResponseCusom } from "../../models/HttpResponseCusom";
import { AlertService } from "../../services/alert.service";
@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  allStages: Stage[];
  game: Game = new Game(
    new Date,
    0,
    new Death('', new Stage(1, 1, StageType.Barrels), false),
    new Death('', new Stage(1, 1, StageType.Barrels), false),
    new Death('', new Stage(1, 1, StageType.Barrels), false),
    new Death('', new Stage(1, 1, StageType.Barrels), false),
  );

  stageTypes = StageType;

  @ViewChild('newGameFormModal') public newGameFormModal: ModalWindowComponent;
  bsValue: Date = new Date();

  constructor(
    private alertService: AlertService,
    private gameService: GameService
  ) { }

  ngOnInit() {
    console.log(this.game);
    this.allStages = _.values(_.groupBy(ALLSTAGES, 'level'));
    console.log(this.allStages);
  }

  openNewGameModal() {
    this.newGameFormModal.showPopup();
  }

  setFirstDeath(stage: Stage) {
    this.game.firstDeath.stage = stage;
  }

  setSecondDeath(stage: Stage) {
    this.game.secondDeath.stage = stage;
  }

  setThirdDeath(stage: Stage) {
    this.game.thirdDeath.stage = stage;
  }

  setFourthDeath(stage: Stage) {
    this.game.fourthDeath.stage = stage;
  }

  submitGame() {
    this.gameService.create(this.game).subscribe(
      (data: HttpResponseCusom) => {
        this.newGameFormModal.hidePopup();
        this.alertService.success(data.message, true);
      },
      (error: HttpResponseCusom) => {
        this.newGameFormModal.hidePopup();
        this.alertService.error(error.message, true);
      });
  }
}
