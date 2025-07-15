import { useState, useEffect } from "react";
import "../App.css"
type dayArrType = Array<number | string>;

function Weeks() {
    const [weekArr, setWeekArr] = useState<dayArrType>([]);

    useEffect(() => setWeekArr(["Sun", "Mon", "Tue", "Wen", "Tur", "Fri", "Sat"]), []);

    const render = () => {
        return weekArr.map((week) => <li key={week}>{week}</li>)
    }

    return(<ul className="weeks">{render()}</ul>);
}

function Days() {
    const [dayArr, setDayArr] = useState<dayArrType>([]);

    useEffect(() => {
        const days = Array.from({ length: 31 }, (_, i) => i + 1);
        setDayArr(days);
    }, [])

  const render = () => {
    return dayArr.map((day) => <li key={day}>{day}</li>);
  };

    return(<ul className="days">{render()}</ul>);
}

export function Calendar() {
    return(
        <div className='calendar'>
            <header className='nav'>
                <button className='month_nav'>&lt;</button>
                <div className='month'>month</div>
                <button className='month_nav'>&gt;</button>
            </header>
            <Weeks />
            <Days />
        </div>
    );
}