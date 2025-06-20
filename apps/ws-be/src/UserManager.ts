import { WebSocket } from 'ws';
import { User, UserMessage } from './types';

let ID = 1;

export class UserManager {
    private _users: User[];

    constructor() {
        this._users = [];
    }

    addUser(ws: WebSocket, name: string) {
        const id = ID++;
        this._users.push({ id, name, ws });

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
}
