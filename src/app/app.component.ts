import { SettingPage } from './../pages/setting/setting';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AuthProvider } from "../providers/auth/auth";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //設定首頁
  //rootPage:any = TabsPage;
  rootPage:any = LoginPage;
  settingPage = SettingPage;
  //test
  @ViewChild('nav') nav: NavController;


  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    authProvider: AuthProvider,
    private menuCtrl: MenuController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    authProvider.authUser.subscribe(jwt => {
      //當訂閱者收到jwt，將rootPage導向首頁，反之若無驗證，則導向登入頁面
      if (jwt) {
        this.rootPage = TabsPage;
      }
      else {
        this.rootPage = LoginPage;
      }
    });
    //當應用程序啟動時，調用authProvider的checkLogin()，檢查JWT是否存儲在本地。
    authProvider.checkLogin();
  }

  //載入頁面
  onLoad(page: any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }
}
