import { createAction, props } from '@ngrx/store';

const setAuth = createAction(
  '[AppState Component] SetAuth',
  props<{ auth: boolean }>()
);
const logout = createAction('[AppState Component] Logout');

export const AppStateActions = {
  setAuth,
  logout,
};
