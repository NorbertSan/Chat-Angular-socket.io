import { createAction, props } from '@ngrx/store';

const setAuth = createAction(
  '[UserState Component] SetAuth',
  props<{ auth: boolean }>()
);
const logout = createAction('[UserState Component] Logout');

export const UserStateActions = {
  setAuth,
  logout,
};
