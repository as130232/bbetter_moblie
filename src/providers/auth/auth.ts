import { IMember } from './../../model/member';
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ReplaySubject, Observable} from "rxjs";
import {Storage} from "@ionic/storage";
import {JwtHelper, AuthHttp} from "angular2-jwt";
import {SERVER_URL} from "../../config";

/*
 * AuthProvider實現了管理應用程序與認證。
 * 檢查JWT，向Server端發送登錄和註冊請求並處理回傳的響應。
 */
@Injectable()
export class AuthProvider {
  /* 利用RxJs庫提供的ReplaySubject，當授權狀態更改時通知應用程序的其他部分
   * authUser此物件代表著可觀察的被觀察者(主題)，當被呼叫時所有訂閱者將被通知，
   * 利用此機制從LoginPage重導回HomePage
   * authUser是Observer觀察者 會接收Observable(主題)回傳的資訊，而Observe:有三種狀態
   * ●next:Observer接收到一個值(類似promise中的.then)
   * ●error:Observer接收到一個錯誤
   * ●complete:Observer接收到完成的訊息
   */ 
  authUser = new ReplaySubject<any>(1);

  constructor(private readonly http: Http,
              private readonly authHttp: AuthHttp,
              private readonly storage: Storage,
              private readonly jwtHelper: JwtHelper) {
  }
  /* 
   * 每次應用程序啟動時，它會調用authProvider的checkLogin（）函數。 此功能檢查JWT是否存儲在本地
   * authHttp:是種Observable(可觀察者、主題)，有以下幾種特性
   * ●Lazy:若沒有作subscribe，將不會被執行
   * ●Cancellable:在執行過程中，可隨時中斷取消行為，例:Server Site作大資料的Loading
   */
  checkLogin() {
    this.storage.get('jwt').then(jwt => {
      //若jwt存在且檢查具有效性
      if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
        this.authHttp.get(`${SERVER_URL}/authenticate`)
          .subscribe(() => this.authUser.next(jwt),
            //若調用失敗，或本地儲存jwt已過期，將本地端移除token，調用authUser.next(null)，然後觸發導航到LoginPage
            (err) => this.storage.remove('jwt').then(() => this.authUser.next(null)));
        // OR
        // this.authUser.next(jwt);
      }
      else {
        this.storage.remove('jwt').then(() => this.authUser.next(null));
      }
    });
  }
  //登入
  login(values: any): Observable<any> {
    return this.http.post(`${SERVER_URL}/login`, values)
    //map屬於transformation，可以將回傳接收的資料可以轉換成其他型態的資料
      .map(response => response.text())
      .map(jwt => this.handleJwtResponse(jwt));
  }
  
  //facebook登入
  //loginWithFb(userID: string, accessToken: string): Observable<any> {
  loginWithFb(values: any): Observable<any> {
    return this.http.post(`${SERVER_URL}/signin/facebook`, values)
      .map(response => response.text())
      .map(jwt => this.handleJwtResponse(jwt));
  }
  
  //登出
  logout() {
    this.storage.remove('jwt').then(() => this.authUser.next(null));
  }
  //註冊
  signup(values: any): Observable<any> {
    return this.http.post(`${SERVER_URL}/signup`, values)
      .map(response => response.text())
      .map(jwt => {
        if (jwt !== 'EXISTS') {
          return this.handleJwtResponse(jwt);
        }
        else {
          return jwt;
        }
      });
  }
  //在本地端儲存token，然後調用authUser.next(jwt)觸發HomePage
  private handleJwtResponse(jwt: string) {
    return this.storage.set('jwt', jwt)
      .then(() => this.authUser.next(jwt))
      .then(() => jwt);
  }

}