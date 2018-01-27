import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalWindowComponent } from "../modal-window/modal-window.component";
import { Stage } from "../../models/Stage";
import { ALLSTAGES } from "../../data/AllStages"
import { Game } from "../../models/Game";
import { Life } from "../../models/Life";
import { StageType } from "../../models/enums/StageType";
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
                  new Life('', new Stage(1, 1, StageType.Barrels)),
                  new Life('', new Stage(1, 1, StageType.Barrels)),
                  new Life('', new Stage(1, 1, StageType.Barrels)),
                  new Life('', new Stage(1, 1, StageType.Barrels)),
              );

  @ViewChild('newGameFormModal') public newGameFormModal: ModalWindowComponent;
  bsValue: Date = new Date();

  constructor() { }

  ngOnInit() {
    console.log(this.game);
    this.allStages = ALLSTAGES;
  }

  openNewGameModal() {
    this.newGameFormModal.showPopup();
  }

}
