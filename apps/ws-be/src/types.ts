import { WebSocket } from 'ws';

export interface User {
    id: number;
    ws: WebSocket;
    name: string;
}

export interface UserMessage {
    type: string;
    payload: any;
}