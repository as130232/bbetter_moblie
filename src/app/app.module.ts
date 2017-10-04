import { FriendsPage } from './../pages/friends/friends';
import { AuthProvider } from './../providers/auth/auth';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SignupPage } from './../pages/signup/signup';
import { LoginPage } from './../pages/login/login';
import { SettingPage } from './../pages/setting/setting';
import { MyApp } from './app.component';

import { NgModule, ErrorHandler } from '@angular/core';
import { Http, HttpModule, RequestOptions} from "@angular/http";
import { JwtHelper, AuthConfig, AuthHttp} from "angular2-jwt";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule} from "@ionic/storage";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


export function authHttpServiceFactory(http: Http, options: RequestOptions, storage: Storage) {
  const authConfig = new AuthConfig({
    //noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('jwt')),
  });
  return new AuthHttp(authConfig, http, options);
}
//宣告此AppModule底下有哪些Component
@NgModule({
  //聲明屬於這個模組的Component、Pipe、Directives，然後就可以在模組中使用這些元件
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SettingPage,
    LoginPage,
    SignupPage,
    FriendsPage
  ],
  //若有使用到其它模組的元件或服務，在此import進來(讓底下Component都可以使用這些外部import的Module)
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),//已包含FormsModule、ReactiveFormsModule
    HttpModule,
    IonicStorageModule.forRoot({
      name: 'myapp',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
    CustomFormsModule
  ],
  //指定要在index.html中做為起始節點的根元件(第一個啟動的Component)
  bootstrap: [IonicApp],
  //通常是用來宣告不通過Route動態加入到DOM中的元件，指定在這裡的元件將會在這個模組定義的時候進行編譯。
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SettingPage,
    LoginPage,
    SignupPage,
    FriendsPage
  ],
  //用來列出模組需要用的共用Service
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    JwtHelper, {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions, Storage]
    }
  ]
})
export class AppModule {}
