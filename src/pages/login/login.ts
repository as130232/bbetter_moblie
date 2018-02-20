import { SignupPage } from "../signup/signup";
import { AuthProvider } from "../../providers/auth/auth";
import { IMember } from './../../model/member';

import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { IonicPage, NavController, ModalController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  member:IMember; 

  constructor(private readonly navCtrl: NavController,
              private readonly loadingCtrl: LoadingController,
              private readonly authProvider: AuthProvider,
              private fb: Facebook,
              private alertCtrl: AlertController) {
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

  login(value: any) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Logging in ...'
    });

    loading.present();

    this.authProvider
      .login(value)
      .finally(() => loading.dismiss())
      .subscribe(
        () => {},
        err => this.handleError(err));
  }
  //若有錯誤，顯示錯誤訊息
  handleError(error: any) {
    let message: string;
    if (error.status && error.status === 401 || error.status === 404) {
      message = 'Login failed';
      let errorObj = JSON.parse(error._body);
      message = errorObj.message;
    }
    else {
      message = `Unexpected error: ${error.statusText}`;
    }

    // const toast = this.toastCtrl.create({
    //   message,
    //   duration: 5000,
    // });
    // toast.present();

    const alert = this.alertCtrl.create({
      title: 'Login failed',
      message: message,
      buttons: [
        {
          text:'OK',
          handler:() =>{
            //dosomthing
          }
        }
      ]
    });
    alert.present();
  }
  //取得所有FB好友 this.fb.api('me/taggable_friends?fields=id,name,gender,email,picture.width(720).height(720).as(picture_large)', [])
  loginWithFb(){
    this.fb.login(['email', 'public_profile', 'user_friends'])
    .then((res: FacebookLoginResponse) => {

      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Facebook Logging in ...'
      });
      //向server端發出userId與token
      this.authProvider.loginWithFb(res.authResponse)
      .finally(() => loading.dismiss())
      .subscribe(
        () => {},
        err => this.handleError(err));
      
        // this.fb.api('me?fields=id,name,gender,email,picture.width(720).height(720).as(picture_large)', [])
        //     .then((profile)=> {
        //       this.member = { 
        //         memberId: profile.id,
        //         name: profile.name,
        //         email: profile.email,
        //         address: "",
        //         gender: profile.gender,
        //         imageUrl: profile.picture_large.data.url,
        //         money: null,
        //         birthday: null,
        //         token:""
        //       }
      
        //       //將資訊傳遞給後端判斷是否有該會原，有的話回傳jwt，無的話建立該會員資訊
        //       this.storage.set('member', this.member);
        //     })
        //     .catch(e=>{     

        //          const toast = this.toastCtrl.create({
        //           message: "驗證失敗",
        //           duration: 5000,
        //           position: 'bottom'
        //         });
        //         toast.present();
        //     });            
    })
    .catch(e => {
        
    });
  }

}