import { Action, createReducer, on } from '@ngrx/store';
import { addToHistory } from './history.actions';
import { initialState } from './history.state';

const _historyReducer = createReducer(
  initialState,
  on(addToHistory, (state, action) => {
    return {
      ...state,
      history: [...state.history, ...action.ids],
    };
  })
);

export function historyReducer(
  state: { history: number[] } | undefined,
  action: Action
) {
  return _historyReducer(state, action);
}
