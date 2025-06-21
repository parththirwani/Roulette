import { Bet, GameState, Number } from "../types";

export class GameManager{
    state: GameState.CanBet
    private static _instance: GameManager
    bets: Bet[] = [];
    private _lastWinner: Number  = Number.Zero;

    private constructor(){}; 

    public static getInstance(){
        if (!this._instance){
            this._instance = new GameManager();
        }
        return this._instance
    }

    public bet(amount: number, betNumber: Number, id: number): boolean{
        if (this.state === GameState.CanBet){
            this.bets.push({id, amount, number: betNumber})
            return true
        }
        return false;
    }

    public start(){
        this.state= GameState.CanBet
    }

    public end(output: Number){
        this._lastWinner= output;
    }
}