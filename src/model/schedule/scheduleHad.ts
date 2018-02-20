import { ISchedule } from './schedule';

export interface IScheduleHad{
    scheduleHadId: number;
    scheduleInfo: ISchedule;
    authority: number;
    accumulatedTime: number;
    createdate: Date;
}