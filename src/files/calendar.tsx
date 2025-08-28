import { useState, useEffect, useMemo } from 'react'
import { Schedule } from './schedule';
import { AI_white } from './AIInput';
import left_img from '../assets/left.png'
import right_img from '../assets/right.png'
import './calendar.css';

type DayItem = {
    date: Date;
    day: number;
    isCurrentMonth: boolean;
    isWeekend: number;
};

type ScheduleItem ={
    color: string;
    month: number;
    day: number;
    schedule: string;
};

function Weeks() {
    const [weekArr, setWeekArr] = useState<Array<string>>([]);

    useEffect(() => setWeekArr(["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"]), []);

    const render = () => {
        return weekArr.map((week) => <li key={week} className={week}>{week}</li>)
    }

    return(<ul className="weeks">{render()}</ul>);
}

function generateDay(year: number, month: number): DayItem[] {
    const firstOfMonth = new Date(year, month, 1);
    const lastOfMonth  = new Date(year, month + 1, 0);
    const prevLastOfMonth = new Date(year, month, 0);
    const firstWeekday = firstOfMonth.getDay(); // 0(일)~6(토)
    const lastDate = lastOfMonth.getDate(); // 1~28/29/30/31
    const prevLastDate = prevLastOfMonth.getDate();

    const days: DayItem[] = [];

    //isWeekend -> 1 : sun, 2 : sat

    // 1) 이전 달 말일에서부터 채우기
    for (let i = firstWeekday - 1; i >= 0; i--) {
        const date = new Date(year, month - 1, prevLastDate - i);
        if(days.length % 7 == 0){
            days.push({ date, day: date.getDate(), isCurrentMonth: false, isWeekend: 1});
        }
        else if(days.length % 7 == 6){
            days.push({ date, day: date.getDate(), isCurrentMonth: false, isWeekend: 2});
        }
        else{
            days.push({ date, day: date.getDate(), isCurrentMonth: false, isWeekend: 0});
        }
    }

    // 2) 이번 달 날짜 채우기
    for (let d = 1; d <= lastDate; d++) {
        const date = new Date(year, month, d);
        if(days.length % 7 == 0){
            days.push({ date, day: date.getDate(), isCurrentMonth: true, isWeekend: 1});
        }
        else if(days.length % 7 == 6){
            days.push({ date, day: date.getDate(), isCurrentMonth: true, isWeekend: 2});
        }
        else{
            days.push({ date, day: date.getDate(), isCurrentMonth: true, isWeekend: 0});
        }
    }

    // 3) 마지막 주 남은 칸 채우기 (총 42칸 = 7열×6행)
    const totalSlots = 42;
    const nextDaysCount = totalSlots - days.length;
    for (let d = 1; d <= nextDaysCount; d++) {
        const date = new Date(year, month + 1, d);
        if(days.length % 7 == 0){
            days.push({ date, day: date.getDate(), isCurrentMonth: false, isWeekend: 1});
        }
        else if(days.length % 7 == 6){
            days.push({ date, day: date.getDate(), isCurrentMonth: false, isWeekend: 2});
        }
        else{
            days.push({ date, day: date.getDate(), isCurrentMonth: false, isWeekend: 0});
        }
    }
    return days;
}

export const Calander_white = ({AIIsOpen, AIIsVisible, AI_toggle, handleOrder, handleClick, scheduleData}: {AIIsOpen: boolean, AIIsVisible: boolean, AI_toggle: any, handleOrder: any, handleClick: any, scheduleData: ScheduleItem[]}) => {
    const [month, setMonth] = useState(new Date()); // 현재 보고 있는 달
    const [days, setDays]   = useState<DayItem[]>([]);
    
    useEffect(() => {
        const y = month.getFullYear();
        const m = month.getMonth();
        setDays(generateDay(y, m));
    }, [month]);
    
    const prevMonth = () =>
        setMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
    const nextMonth = () =>
        setMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));

    const [monthEvent, setMonthEvent] = useState<ScheduleItem[]>([]);
    //고맙다 copilot!
    //event 그룹화 -> 띄우기
    useEffect(() => setMonthEvent(scheduleData.filter((item) => item.month === month.getMonth() + 1)), [scheduleData, month]);
    const groupedEvent = useMemo(() => {
        return monthEvent.reduce((acc, eventItem) => {
            const key = eventItem.day;
            if (!acc[key]) acc[key] = [];
            acc[key].push(eventItem.color);
            return acc;
        }, {} as Record<number, string[]>);
    }, [monthEvent]); //그리고 나는 이걸 이해하지 못했다
    //뭐요 나 프론트 원래 아니야!
    console.log(monthEvent);


    return(
        <div className='body'>
            <div className='calendar'>
                <header className='nav'>
                    <button className='month_nav' onClick={prevMonth}><img src={left_img} /></button>
                    <div className="month">{month.getMonth() + 1}</div>
                    <button className='month_nav' onClick={nextMonth}><img src={right_img} /></button>
                </header>
                <Weeks />
                <ul className="days">
                    {days.map(({ date, day, isCurrentMonth, isWeekend }) => {
                        const relatedEvent = groupedEvent[day]

                        return(<div
                            key={date.toISOString()}
                            className={`${isCurrentMonth ? "current_month" : "adjacent_month"} 
                                ${isWeekend ? isWeekend - 1 ? "saturday": "sunday" : "weekdays"}`}
                        >{day}
                        {isCurrentMonth && relatedEvent?.map((ev, idx) => {return (<div key={idx.toString()} className={`line ${ev}`}/>);})}
                        </div>
                    )})}
                </ul>
            </div>
            {AIIsOpen || 
                <Schedule scheduleData={monthEvent}/>
            }
            {AIIsOpen && 
                <AI_white isVisible={AIIsVisible} open_toggle={AI_toggle} handleOrder={handleOrder} handleClick={handleClick}/>
            }
        </div>
    );
}
