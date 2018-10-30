import {
    Death
} from './Death';

export class Game {
    date: Date;
    score: number;
    firstDeath: Death;
    secondDeath: Death;
    thirdDeath: Death;
    fourthDeath: Death;
    constructor(
        date: Date,
        score: number,
        firstDeath: Death,
        secondDeath: Death,
        thirdDeath: Death,
        fourthDeath: Death,
    ) {
        this.date = date;
        this.score = score;
        this.firstDeath = firstDeath;
        this.secondDeath = secondDeath;
        this.thirdDeath = thirdDeath;
        this.fourthDeath = fourthDeath;
    }
}
