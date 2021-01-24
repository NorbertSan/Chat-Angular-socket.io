import { UserStateActions } from './userState.actions';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

export interface UserState {
  auth: boolean;
  email: string;
  displayName: string;
}

export const initialUserState: UserState = {
  auth: false,
  email: null,
  displayName: null,
};

const _UserStateReducer: ActionReducer<UserState, Action> = createReducer(
  initialUserState,
  on(UserStateActions.setAuth, (state, { auth }) => ({ ...state, auth })),
  on(UserStateActions.reset, () => initialUserState)
);

export function UserStateReducer(state: UserState, action: Action): any {
  return _UserStateReducer(state, action);
}
