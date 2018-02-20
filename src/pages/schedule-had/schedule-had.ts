import { SchedulePage } from './../schedule-had/schedule/schedule';
import { IScheduleHad } from './../../model/schedule/scheduleHad';
import { SERVER_URL } from './../../config';

import { AuthHttp } from 'angular2-jwt';
import { Response } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-schedule-had',
  templateUrl: 'schedule-had.html',
})
export class ScheduleHadPage{
  schedulePage = SchedulePage;
  scheduleHads: IScheduleHad[];

  constructor(
    private readonly authHttp: AuthHttp,
  ) {
  }

  ionViewWillEnter(){
    //取得擁有行程
    this.authHttp.get(`${SERVER_URL}/api/member/me/scheduleHads`)
    .subscribe((res: Response) => {
        this.scheduleHads = res.json();
    });
  }

  //移除該擁有行程
  onRemoveScheduleHad(scheduleHad: IScheduleHad){
    var index = this.scheduleHads.indexOf(scheduleHad, 0);
    if(index > -1){
      this.scheduleHads.splice(index, 1);
    }
  }

}
