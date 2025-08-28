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
export const Schedule = ({ scheduleData} : {scheduleData: Array<ScheduleItem>} ) => {

    return(
        <div className="schedule">
            <div className='space' />
            {scheduleData.map(({color, month, day, schedule}) => (
                <MonoSchedule color={color} month={month} day={day} schedule={schedule} />
            ))}
        </div>
    )
}
