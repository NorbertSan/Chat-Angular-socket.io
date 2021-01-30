import { UserState } from './userState.reducer';
import { StoreState } from './../index';
import { createSelector } from '@ngrx/store';

export const SelectUserState = (state: StoreState) => state.UserState;

export const UserStateSelectors = {
  email: createSelector(
    SelectUserState,
    (userState: UserState) => userState.email
  ),
  displayName: createSelector(
    SelectUserState,
    (userState: UserState) => userState.displayName
  ),
};
