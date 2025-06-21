import { Bet, GameState, Number } from "../types";
import { UserManager } from "../User/UserManager";

export class GameManager {
    state: GameState
    private static _instance: GameManager
    bets: Bet[] = [];
    private _lastWinner: Number | null = null;

    private constructor() {
        this.state = GameState.GameOver
    };

    public static getInstance() {
        if (!this._instance) {
            this._instance = new GameManager();
        }
        return this._instance
    }

    public bet(amount: number, betNumber: Number, id: number): boolean {
        if (this.state === GameState.CanBet) {
            this.bets.push({ id, amount, number: betNumber })
            return true
        }
        return false;
    }

    public start() {
        this.state = GameState.CanBet
    }

    public end(output: Number) {
        this._lastWinner = output;
        this.bets.forEach(bet =>{
            if (bet.number === output){
                UserManager.getInstance().won(bet.id, bet.amount)
            }else{
                UserManager.getInstance().lost(bet.id, bet.amount)
            }
        })
    }
}
