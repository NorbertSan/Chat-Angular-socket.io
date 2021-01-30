import { UserStateActions } from './userState.actions';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

export interface UserState {
  email: string;
  displayName: string;
}

export const initialUserState: UserState = {
  email: null,
  displayName: null,
};

const _UserStateReducer: ActionReducer<UserState, Action> = createReducer(
  initialUserState,
  on(UserStateActions.logout, () => initialUserState)
);

export function UserStateReducer(state: UserState, action: Action): any {
  return _UserStateReducer(state, action);
}
