import { UserState } from './userState.reducer';
import { AppState } from './../index';
import { createSelector } from '@ngrx/store';

export const SelectUserState = (state: AppState) => state.UserState;

export const UserStateSelectors = {
  auth: createSelector(
    SelectUserState,
    (userState: UserState) => userState.auth
  ),
  email: createSelector(
    SelectUserState,
    (userState: UserState) => userState.email
  ),
  displayName: createSelector(
    SelectUserState,
    (userState: UserState) => userState.displayName
  ),
};
