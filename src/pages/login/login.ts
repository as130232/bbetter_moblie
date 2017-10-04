
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import { Http, Response } from '@angular/http';

//@IonicPage()
// @Component({
//   selector: 'page-login',
//   templateUrl: 'login.html',
// })


// export class LoginPage {

//   constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private alertCtrl: AlertController, private http: Http) {
//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad LoginPage');
//   }
//   //登入驗證
//   login(email: HTMLInputElement, password: HTMLInputElement){
//     let userInfo: string = '信箱：' + email.value  + '密碼：' + password.value;
//     if(email.value.length == 0){
//       let alert = this.alertCtrl.create({
//         title: 'error',
//         subTitle: '請輸入信箱',
//         buttons: ['Ok']
//       });
//       alert.present();
//       return false;
//     } else if (password.value.length == 0){
//       let alert = this.alertCtrl.create({
//         title: 'error',
//         subTitle: '請輸入密碼',
//         buttons: ['Ok']
//       });
//       return false;
//     }else{
//       //this.navCtrl.push(TabsPage);
//       // let modal = this.modalCtrl.create(TabsPage);
//       // modal.present();

//       // this.http.request('http://localhost:8081/api/member/1')
//       // .subscribe((res: Response) => {
//       //   // this.listData = res.json();
//       //   console.log(res.json());
//       // });
      
//       this.http.post('http://localhost:8081/login',userInfo)
//       .subscribe((res: Response) => {
//         // this.listData = res.json();
//         console.log(res.json());
//       });
//     }
//   }
// }


//import {Component} from '@angular/core';
import {LoadingController, ToastController} from 'ionic-angular';
import {SignupPage} from "../signup/signup";
import {AuthProvider} from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  test:string = 'test';
  constructor(private readonly navCtrl: NavController,
              private readonly loadingCtrl: LoadingController,
              private readonly authProvider: AuthProvider,
              private readonly toastCtrl: ToastController) {
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
    if (error.status && error.status === 401) {
      message = 'Login failed';
      let errorObj = JSON.parse(error._body);
      message = errorObj.message;
    }
    else {
      message = `Unexpected error: ${error.statusText}`;
    }

    const toast = this.toastCtrl.create({
      message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }

}