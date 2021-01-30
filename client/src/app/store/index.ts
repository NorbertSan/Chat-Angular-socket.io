import { AppState } from './appState/appState.reducer';
import { UserState } from './userState/userState.reducer';

export interface StoreState {
  AppState: AppState;
  UserState: UserState;
}
