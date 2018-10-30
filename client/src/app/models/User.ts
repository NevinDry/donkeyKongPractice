import { Game } from "./Game";

export class User {
    _id: string;
    name: string;
    exp: Date;
    token: string;
    games: Game[];
}