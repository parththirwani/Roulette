import { WebSocket } from "ws";
import { COINS, Number, outgoingMessage } from "../types";
import { GameManager } from "../Game/GameManager";

export class User {
    id: number;
    ws: WebSocket;
    name: string;
    locked: number;
    balance: number;

    constructor(id: number, name: string, ws: WebSocket) {
        this.id = id;
        this.name = name;
        this.ws = ws;
        this.balance = 2500;
        this.locked = 0;
    }

    bet(clientId: string, amount: COINS, betNumber: Number) {
        this.balance -= amount;
        this.locked += amount;
        const response = GameManager.getInstance().bet(amount, betNumber, this.id)
        if (response) {
            this.send({
                clientId,
                type: "bet",
                amount: amount,
                locked: this.locked,
                balance: this.balance
            })
        } else {
            this.send({
                clientId,
                type: "bet-undo",
                amount: amount,
                locked: this.locked,
                balance: this.balance
            })
        }   

    }

    send(payload: outgoingMessage){
        this.ws.send(JSON.stringify(payload));
    }
}