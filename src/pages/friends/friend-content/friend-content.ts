import { IFriend } from './../../../model/friend';
import { Component, OnInit } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-friend-content',
  templateUrl: 'friend-content.html',
})
export class FriendContentPage {

  friend:IFriend;
  
    constructor(
      private viewCtrl:ViewController,
      private navParams:NavParams,
    ) {
    }
  
    ionViewWillEnter(){
      this.friend = this.navParams.data;
    }
  
    onClose(){
      this.viewCtrl.dismiss();
    }
}
