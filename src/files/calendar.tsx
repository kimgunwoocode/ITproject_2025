import { useState, useEffect } from "react";
import "../App.css"

type DayItem = {
    date: Date;
    day: number;
    isCurrentMonth: boolean;
};


function Weeks() {
    const [weekArr, setWeekArr] = useState<Array<string>>([]);

    useEffect(() => setWeekArr(["Sun", "Mon", "Tue", "Wen", "Tur", "Fri", "Sat"]), []);

    const render = () => {
        return weekArr.map((week) => <li key={week}>{week}</li>)
    }

    return(<ul className="weeks">{render()}</ul>);
}

function generateCalendar(year: number, month: number): DayItem[] {
    const firstOfMonth = new Date(year, month, 1);
    const lastOfMonth  = new Date(year, month + 1, 0);
    const prevLastOfMonth = new Date(year, month, 0);
    const firstWeekday = firstOfMonth.getDay(); // 0(일)~6(토)
    const lastDate = lastOfMonth.getDate(); // 1~28/29/30/31
    const prevLastDate = prevLastOfMonth.getDate();

    const days: DayItem[] = [];

    // 1) 이전 달 말일에서부터 채우기
    for (let i = firstWeekday - 1; i >= 0; i--) {
        const date = new Date(year, month - 1, prevLastDate - i);
        days.push({ date, day: date.getDate(), isCurrentMonth: false });
    }

    // 2) 이번 달 날짜 채우기
    for (let d = 1; d <= lastDate; d++) {
        const date = new Date(year, month, d);
        days.push({ date, day: d, isCurrentMonth: true });
    }

    // 3) 마지막 주 남은 칸 채우기 (총 42칸 = 7열×6행)
    const totalSlots = 42;
    const nextDaysCount = totalSlots - days.length;
    for (let d = 1; d <= nextDaysCount; d++) {
        const date = new Date(year, month + 1, d);
        days.push({ date, day: d, isCurrentMonth: false });
    }
    return days;
}


export function Calendar() {
    const [month, setMonth] = useState(new Date()); // 현재 보고 있는 달
    const [days, setDays]   = useState<DayItem[]>([]);

    useEffect(() => {
        const y = month.getFullYear();
        const m = month.getMonth();
        setDays(generateCalendar(y, m));
    }, [month]);

    const prevMonth = () =>
        setMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
    const nextMonth = () =>
        setMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));



    return(
        <div className='calendar'>
            <header className='nav'>
                <button className='month_nav' onClick={prevMonth}>◀</button>
                <div className="month">{month.getFullYear()}년 {month.getMonth() + 1}월</div>
                <button className='month_nav' onClick={nextMonth}>▶</button>
            </header>
            <Weeks />
            <ul className="days">
                {days.map(({ date, day, isCurrentMonth }) => (
                    <li
                        key={date.toISOString()}
                        className={`${isCurrentMonth ? "current_month" : "adjacent_month"}`}
                    >{day}</li>
                ))}
            </ul>
        </div>
    );
}
//css 나중에 고치기