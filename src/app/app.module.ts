import { TouchEventComponet } from './../components/touch-event.component';
import { SettingService } from './../service/setting';
import { PetPage } from './../pages/pet/pet';
import { SchedulePage } from './../pages/schedule-had/schedule/schedule';
import { ScheduleHadPage } from './../pages/schedule-had/schedule-had';
import { FriendContentPage } from './../pages/friends/friend-content/friend-content';
import { FriendsPage } from './../pages/friends/friends';
import { AuthProvider } from './../providers/auth/auth';
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
import { CustomFormsModule } from 'ng2-validation'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule} from "@ionic/storage";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';

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
    TouchEventComponet,
    LoginPage,
    SignupPage,
    TabsPage,
    HomePage,
    ScheduleHadPage,
    SchedulePage,
    PetPage,
    SettingPage,
    FriendsPage,
    FriendContentPage
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
    LoginPage,
    SignupPage,
    TabsPage,
    HomePage,
    ScheduleHadPage,
    SchedulePage,
    PetPage,
    SettingPage,
    FriendsPage,
    FriendContentPage
  ],
  //用來列出模組需要用的共用Service
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    JwtHelper, 
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions, Storage]
    },
    Facebook,
    SettingService,
  ]
})
export class AppModule {}
