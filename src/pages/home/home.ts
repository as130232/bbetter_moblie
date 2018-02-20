import { IMember } from './../../model/member';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { JwtHelper, AuthHttp} from "angular2-jwt";
import { SERVER_URL } from "../../config";
import { AuthProvider } from "../../providers/auth/auth";
import {Storage} from "@ionic/storage";
import {Headers} from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //Interpolation (類似實體變數)
  //接收數據物件
  listData: Object;
  member:IMember;
  
  
  //依賴注入
  constructor(private readonly authProvider: AuthProvider,
    private readonly jwtHelper: JwtHelper,
    private readonly authHttp: AuthHttp,
    private readonly storage: Storage, 
    private http: Http) {

  }

  //頁面加載時運行。此事件僅在每個頁面創建時發生一次。如果一個頁面離開但被緩存，則此事件將不會在後續查看時再次啟動
  ionViewDidLoad() {
    //取得該會員資訊，並存在本機端
    this.authHttp.get(`${SERVER_URL}/api/member/me`)
    .subscribe(
      (res: Response) => {
        this.member = res.json();
        this.storage.set('memberInfo', this.member);
      },
      err => {
        let errorObj = JSON.parse(err._body);
        console.log(errorObj.message)
      }
    );
  }

  logout() {
    this.authProvider.logout();
  }

}
