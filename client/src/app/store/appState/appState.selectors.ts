import { AppState } from './appState.reducer';
import { StoreState } from './../index';
import { createSelector } from '@ngrx/store';

export const SelectAppState = (state: StoreState) => state.AppState;

export const AppStateSelectors = {
  auth: createSelector(SelectAppState, (appState: AppState) => appState.auth),
};
