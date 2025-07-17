import { useState, useEffect } from "react";
import "../App.css"

function Weeks() {
    const [weekArr, setWeekArr] = useState<Array<string>>([]);

    useEffect(() => setWeekArr(["Sun", "Mon", "Tue", "Wen", "Tur", "Fri", "Sat"]), []);

    const render = () => {
        return weekArr.map((week) => <li key={week}>{week}</li>)
    }

    return(<ul className="weeks">{render()}</ul>);
}

function getDayArray(year: number, month: number): number[] {
  const lastDay = new Date(year, month + 1, 0).getDate(); // 말일
  return Array.from({ length: lastDay }, (_, i) => i + 1);
}


export function Calendar() {
    const [month, setMonth] = useState<Date>(new Date());
    const [dayArr, setDayArr] = useState<number[]>([]);

    useEffect(() => {
        const year = month.getFullYear();
        const m = month.getMonth(); // 0~11
        const days = getDayArray(year, m);
        setDayArr(days);
    }, [month]);

    const prevMonth = () => {
        setMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    }
    const nextMonth = () => {
        setMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    }



    return(
        <div className='calendar'>
            <header className='nav'>
                <button className='month_nav' onClick={prevMonth}>◀</button>
                <div className="month">{month.getFullYear()}년 {month.getMonth() + 1}월</div>
                <button className='month_nav' onClick={nextMonth}>▶</button>
            </header>
            <Weeks />
            <ul style={{ display: "flex", flexWrap: "wrap", width: 7 * 40 }}>
                {dayArr.map(day => (
                    <li
                        key={day}
                        style={{
                            width: 40,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            listStyle: "none",
                            border: "1px solid #ddd",
                    }}
                    >
                    {day}
                    </li>
        ))}
      </ul>
        </div>
    );
}
//css 나중에 고치기