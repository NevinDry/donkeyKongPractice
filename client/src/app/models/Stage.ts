import { StageType } from "./enums/StageType";

export class Stage {
    level: number;
    position: number;
    stageType: StageType;

    constructor(
        level: number,
        position: number,
        stageType: StageType,
    ) {
        this.level = level;
        this.position = position;
        this.stageType = stageType;

    }

    public getIcon() {
        switch (this.stageType){
            case StageType.Barrels : {
                return 'assets/barrel.jpg'
            }
            case StageType.Rivets : {
                return 'assets/rivet.jpg'
            }
            case StageType.Elevators : {
                return 'assets/elevator.jpg'
            }
            case StageType.Pies : {
                return 'assets/pie.jpg'
            }
        }
        }
    }
