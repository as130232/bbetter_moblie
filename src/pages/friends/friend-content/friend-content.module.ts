import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendContentPage } from './friend-content';

@NgModule({
  declarations: [
    FriendContentPage,
  ],
  imports: [
    IonicPageModule.forChild(FriendContentPage),
  ],
})
export class FriendContentPageModule {}
