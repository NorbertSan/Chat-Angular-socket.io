import { StoreModule } from '@ngrx/store';
import { ChatRoutingModule } from './chat-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStateReducer } from '../store/userState/userState.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChatRoutingModule,
    StoreModule.forFeature('User', UserStateReducer, {}),
  ],
})
export class ChatModule {}
