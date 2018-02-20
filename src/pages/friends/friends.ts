import { FriendContentPage } from './friend-content/friend-content';
import { IFriend } from './../../model/friend';
import { IMember } from './../../model/member';
import { SERVER_URL } from "../../config";

import { Component, OnInit } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { JwtHelper, AuthHttp} from "angular2-jwt";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage{
  friendContentPage = FriendContentPage
  member:IMember;
  friends:IFriend[];

  constructor(
    private readonly authHttp: AuthHttp,
    private readonly storage: Storage, 
    private modalCtrl: ModalController
  ) {
  }

  // ngOnInit() {
  ionViewWillEnter(){
    //get memberInfo
    this.storage.get('memberInfo')
    .then((val:IMember) => {
      this.member = val;
    })
    .then(() => {
      let memberId = this.member.memberId;
      //取得該好友列表
      this.authHttp.get(`${SERVER_URL}/api/member/me/friends`)
      .subscribe((res: Response) => {
          this.friends = res.json();
      });
    })
  }

  onViewFriend(friend:IFriend){
    //將好友資訊傳遞給該頁面
    const modal = this.modalCtrl.create(FriendContentPage, friend);
    modal.present();
  }
  

}
