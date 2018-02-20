import { ScheduleHadPage } from './../schedule-had/schedule-had';
import { PetPage } from './../pet/pet';
import { FriendsPage } from './../friends/friends';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { SettingPage } from './../setting/setting';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabRoots: Object[];
  constructor() {
    this.tabRoots = [
      {
        root: HomePage,
        tabTitle: 'Home',
        tabIcon: 'home'
      },
      {
        root: ScheduleHadPage,
        tabTitle: '行程',
        tabIcon: 'md-calendar'
      },
      {
        root: PetPage,
        tabTitle: '寵物',
        tabIcon: 'md-bug'
      },
      {
        root: FriendsPage,
        tabTitle: '好友',
        tabIcon: 'md-contacts'
      },
      {
        root: SettingPage,
        tabTitle: '設置',
        tabIcon: 'cog'
      }
    ]
  }
}
