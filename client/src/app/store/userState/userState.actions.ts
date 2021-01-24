import { createAction, props } from '@ngrx/store';

const setAuth = createAction(
  '[UserState Component] SetAuth',
  props<{ auth: boolean }>()
);
const reset = createAction('[UserState Component] Reset');

export const UserStateActions = {
  setAuth,
  reset,
};
