import X from '../assets/X.png'
import './AIInput.css'

export const AI_white = ({isVisible, open_toggle, handleOrder, handleClick} : {isVisible : boolean, open_toggle : any, handleOrder: any, handleClick: any}) => {
    return(
        <div className={`AI ${isVisible ? 'in' : 'out'}`}>
            <button className="AI_X" onClick={open_toggle} ><img src={X} width="35" height="35"/></button>
            <div className="AI_title"> AI에게 일정을 추천 받아보세요</div>
            <div className="AI_detail">날짜와 일정의 상세 내용을 입력하면<br />AI가 일정을 추가합니다</div>
            <textarea id="input" className="AI_input" placeholder="일정 입력" cols={48} rows={30} onChange={handleOrder}/>
            <button className="AI_get_input" onClick={handleClick}>입력</button>
        </div>
    );
}