import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';

export class SetCurrentWord {
    static readonly type = '[Randomword] Set Current Word';
    constructor(public word: string) { }
}

export class SetIsRunning {
    static readonly type = '[Randomword] Set Is Running';
    constructor(public isRunning: boolean) { }
}

export interface RandomwordStateModel {
    currentWord: string;
    isRunning: boolean;
}

@State<RandomwordStateModel>({
    name: 'randomword',
    defaults: {
        currentWord: '',
        isRunning: false
    }
})
@Injectable()
export class RandomwordState {

    @Selector()
    static getCurrentWord(state: RandomwordStateModel) {
        return state.currentWord;
    }

    @Selector()
    static getIsRunning(state: RandomwordStateModel) {
        return state.isRunning;
    }

    @Action(SetCurrentWord)
    setCurrentWord(ctx: StateContext<RandomwordStateModel>, action: SetCurrentWord) {
        if (action.word !== '') {
            const state = ctx.getState();
            ctx.setState({
                ...state,
                currentWord: action.word
            });
        }
    }

    @Action(SetIsRunning)
    setIsRunning(ctx: StateContext<RandomwordStateModel>, action: SetIsRunning) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            isRunning: action.isRunning
        });
    }
}
