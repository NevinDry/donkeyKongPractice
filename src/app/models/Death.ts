import {
    Stage
} from './Stage';

export class Death {

    comment: string;
    stage: Stage;
    wild?: boolean;
    constructor(
        comment: string,
        stage: Stage,
        wild?: boolean,
    ) {
        this.comment = comment;
        this.stage = stage;
        this.wild = wild;
    }
}
