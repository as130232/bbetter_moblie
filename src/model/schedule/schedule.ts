export interface ISchedule{
    scheduleId: number;
    scheduleTypeInfo: {
        scheduleTypeId: number;
        typeName: string;
    }
    skillId: number;
    startTime: Date;
    endTime: Date;
    name: string;
    location: string;
    status: number;
    continuousTime: number;
    visibility: number;
    isCycle: number;
    isNeedRemind: number;
    isTeamSchedule: number;
    createdate: Date;
}