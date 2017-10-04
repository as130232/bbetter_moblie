import { FriendsPage } from './../friends/friends';
import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SettingPage } from './../setting/setting';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  // tab1Root = HomePage;
  // tab2Root = AboutPage;
  // tab3Root = SettingsPage;
  tabRoots: Object[];
  constructor() {
    this.tabRoots = [
      {
        root: HomePage,
        tabTitle: 'Home',
        tabIcon: 'home'
      },
      {
        root: AboutPage,
        tabTitle: 'About',
        tabIcon: 'document'
      },
      {
        root: FriendsPage,
        tabTitle: '好友',
        tabIcon: 'md-people'
      },
      {
        root: SettingPage,
        tabTitle: '設置',
        tabIcon: 'cog'
      }
    ]
  }
}
