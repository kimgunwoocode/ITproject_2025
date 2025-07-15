import { useEffect, useState } from "react";
import "./ScheduleTab.css"

export function ScheduleList() {
    const [schedule, setSchedule] = useState<Array<String | null> | undefined>();

    useEffect(() => setSchedule(["임시 예제들", "일정 1", "일정 2", "1# 3"]), []); //임시 예시
        //애초에 Date: ####, 일정 : ~~~~ 형태로 받기

    const rander = () => {
        if (schedule !== undefined){
            return schedule.map((val) => <button className="schedule">{val}</button>)
        }
        else{
            return (<button className="schedule">예정된 일정이 없습니다</ button>)
        }

    }

    return(
        <ul className="lists">
            
            <div className='scheduleTabHead'>현재 예정 일정</div>
            {rander()}
        </ul>
    );
}