import {
    Life
} from './Life';

export class Game {
    date: Date;
    score: number;
    firstLife: Life;
    secondLife: Life;
    thirdLife: Life;
    fourtLife: Life;
    constructor(
        date: Date,
        score: number,
        firstLife: Life,
        secondLife: Life,
        thirdLife: Life,
        fourtLife: Life,
    ) {
        this.date = date;
        this.score = score;
        this.firstLife = firstLife;
        this.secondLife = secondLife;
        this.thirdLife = thirdLife;
        this.fourtLife = fourtLife;
    }
}
