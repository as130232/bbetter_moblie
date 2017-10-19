import { IFriend } from './../../../model/friend';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-friendcontent',
  templateUrl: 'friendcontent.html',
})
export class FriendcontentPage implements OnInit{
  friend:IFriend;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){
    this.friend = this.navParams.data;
  }
  
}
