import { SettingService } from './../../service/setting';
import { AuthProvider } from './../../providers/auth/auth';
import { IMember } from './../../model/member';
import { LoginPage } from "../login/login";

import { Component } from '@angular/core';
import { Toggle, IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage{

  constructor(
    private readonly authProvider: AuthProvider,
    private settingService: SettingService
  ) {
  }
  
  ionViewDidLoad() {
  }
   logout() {
    this.authProvider.logout();
  }


  onToggle(toggle:Toggle){
    this.settingService.setBackground(toggle.checked);
  }

  checkAltBackground(){
    return this.settingService.isAltBackground();
  }
  
}
