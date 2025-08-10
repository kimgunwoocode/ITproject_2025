import { useState } from "react";
import menu_burger_white from '../assets/menu_buger_white.png'
import X_img from "../assets/X.png"
import AI_img from "../assets/AI.png"
import Log_img from "../assets/Login.png"
import { AI_white } from "./AIInput";
import './menu.css'

export const Menu = ({isOpen, isVisible, open_toggle, AI_toggle} : {isOpen : boolean, isVisible: boolean, open_toggle: any, AI_toggle: any}) => {
    

    return(
        <>
        {isOpen && 
            <div className={`menu_white ${isVisible ? 'in' : 'out'}`}>
                <button className="X" onClick={open_toggle}><img src={X_img} /></button>
                <button className="AI_button B" onClick={() => {AI_toggle(); open_toggle();}}><img src={AI_img} /></button>
                <button className="Log_button B"><img src={Log_img} /></button>
            </div>
        }
        {isOpen ||
            <button className="hamberger_menu" onClick={open_toggle}><img src={menu_burger_white}></img></button>
        }
        
        </>
    );
}