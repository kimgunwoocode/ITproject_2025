import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './AITab.css'



export function AIPrompt() {
    //UI만 맹글어놈
    //const [AIInput, setAIInput] = useState<string>(); 

    const [startDate, setStartDate] = useState<Date | null>(new Date());
    //const [endDate, setEndDate] = useState<Date | null>(null);
    const onChange = (dates: Date | null) => {;
        setStartDate(dates);
    };

    const formatDate : string = "yyyy/MM/dd"
    //https://reactdatepicker.com/#example-custom-time-input

    return(
        <div className="AI">
            당신의 일정을 적으세요<br />
            <div className="date">
                날짜 : &nbsp;
                <DatePicker
                    selected={startDate}
                    className="datePicker"
                    onChange={onChange}
                    dateFormat={formatDate}
                    withPortal
                />
            </div>
            <div className="inputTab">
                <input className="input" placeholder={"일정을 입력하세요"} />
                <button className="button2" id='in' key="enter" >입력</button>
            </div>
        </div>
    );
}