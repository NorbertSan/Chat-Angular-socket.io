import { AppStateActions } from './appState.actions';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

export interface AppState {
  auth: boolean;
}

export const initialUserState: AppState = {
  auth: false,
};

const _AppStateReducer: ActionReducer<AppState, Action> = createReducer(
  initialUserState,
  on(AppStateActions.setAuth, (state, { auth }) => ({ ...state, auth })),
  on(AppStateActions.logout, () => initialUserState)
);

export function AppStateReducer(state: AppState, action: Action): any {
  return _AppStateReducer(state, action);
}
