import { WebSocket } from 'ws';

export interface UserMessage {
    type: string;
    payload: any;
}

export type outgoingMessage = {
    type: "bet",
    clientId: string,
    balance: number
    amount: number,
    locked: number
} | {
    type: "bet-undo",
    clientId: string,
    balance: number
    amount: number,
    locked: number
}

export enum GameState {
    CanBet,
    CantBet,
    GameOver
}

export enum COINS {
    One = 1,
    Five = 5,
    Ten = 10,
    Twenty = 20,
    Fifty = 50,
    Hundred = 100,
    FiveHundred = 500,
}

export enum Number {
    Zero,
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Eleven,
    Twelve,
    Thirteen,
    Fourteen,
    Fifteen,
    Sixteen,
    Seventeen,
    Eighteen,
    Nineteen,
    Twenty,
    TwentyOne,
    TwentyTwo,
    TwentyThree,
    TwentyFour,
    TwentyFive,
    TwentySix,
    TwentySeven,
    TwentyEight,
    TwentyNine,
    Thirty,
    ThirtyOne,
    ThirtyTwo,
    ThirtyThree,
    ThirtyFour,
    ThirtyFive,
}

export type Bet = {
    id: number,
    amount: number,
    number: Number
}

