import { useState, useEffect } from 'react'
import './schedule.css'

type ScheduleItem ={
    color: string;
    month: number;
    day: number;
    schedule: string;
}

function MonoSchedule({color, month, day, schedule} : ScheduleItem) {
    return( 
        <div className='schedule_body'>
            <div className={`schedule_head ${color}`}>{month}/{day}</div>
            <div className="schedule_detail">{schedule}</div>
        </div>
    );
}

//type 버그
export const Schedule = ({mon} : any ) => {
    //예시
    const [sche, setSche] = useState<ScheduleItem[]>([]);
    const [monthSchedule, setMonthSchedule] = useState<ScheduleItem[]>([]);

    useEffect(() => setSche([
        {color: "blue", month: 7, day: 1, schedule: "일정"},
        {color: "red", month: 7, day: 30, schedule: "장바구니"},
        {color: "green", month: 8, day: 4, schedule: "수강신청"}
    ]), []);

    useEffect(() => setMonthSchedule(sche.filter(item => item.month === mon)), [mon]);


    return(
        <div className="schedule">
            <div className='space' />
            {monthSchedule.map(({color, month, day, schedule}) => (
                <MonoSchedule color={color} month={month} day={day} schedule={schedule} />
            ))}
        </div>
    )
}
