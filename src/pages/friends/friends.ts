import { IMember } from './../../model/member';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { SERVER_URL } from "../../config";
import { JwtHelper, AuthHttp} from "angular2-jwt";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage implements OnInit{
  member:IMember = { 
    memberId: null,
    name: "",
    email: "",
    address: "",
    gender: "",
    imageUrl: "",
    money: 0,
    birthday: null
  };

  friends = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private readonly authHttp: AuthHttp,
    private readonly storage: Storage, 
  ) {
  }

  ngOnInit() {
    this.storage.get('memberInfo')
    .then((val:IMember) => {
      this.member = val;
    })
    .then(() => {
      let memberId = this.member.memberId;
      //取得該好友列表
      this.authHttp.get(`${SERVER_URL}/api/member/${memberId}/friends`)
      .subscribe((res: Response) => {
          this.friends = res.json();
          console.log(this.friends);
      });
    })
  }
  
  ionViewDidLoad() {
  
  }

  friendSelected(){

  }
}
