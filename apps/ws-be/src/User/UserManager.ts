import { WebSocket } from 'ws';
import { UserMessage } from '../types';
import { User } from './User';

let ID = 1;

export class UserManager {
    private _users: User[] = [];
    private static _instance: UserManager;

    private constructor() {
    }

    public static getInstance(){
        if (!this._instance){
            this._instance = new UserManager();
        }
        return this._instance
        }

    addUser(ws: WebSocket, name: string) {
        const id = ID++;
     this._users.push(new User(id, name, ws));;

        ws.on('close', () => this.removeUser(id));
    }

    removeUser(id: number) {
        this._users = this._users.filter(user => user.id !== id);
    }

    broadcast(message: UserMessage, userId?: number) {
        this._users.forEach(user => {
            if (userId === undefined || user.id !== userId) {
                user.ws.send(JSON.stringify(message));
            }
        });
    }

    won(id: number, amount: number){
        this.broadcast({
            type: "won",
            clientId: id,
            amount,
        },id)
    }

    lost(id: number, amount: number){
        this.broadcast({
            type: "lost",
            clientId: id,
            amount,
        },id)
}
}
