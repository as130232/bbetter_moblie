import { AuthProvider } from './../../providers/auth/auth';
import { IMember } from './../../model/member';
import { LoginPage } from "../login/login";

import { Http } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { AuthHttp } from 'angular2-jwt';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage implements OnInit{
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
  //member:{IMember};

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    private readonly authProvider: AuthProvider,
    private readonly  authHttp: AuthHttp,
    private jwtHelper: JwtHelper,
    private readonly storage: Storage, 
    private http: Http) {
  }

  ngOnInit() {
    this.storage.get('memberInfo').then((val:IMember) => {
      this.member = val;
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  
  logout() {
    this.authProvider.logout();
  }
}
