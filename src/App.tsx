import { useState, useEffect } from 'react'
import './App.css'
import { Calander_white } from './files/calendar'
import { Menu } from './files/menu'


function App() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const [AIIsOpen, setAIIsOpen] = useState<boolean>(false);
    const [AIIsVisible, setAIIsVisible] = useState<boolean>(false);

    //AI input
    const [order, setOrder] = useState<null | string>();

    const handleOrder = (e : any) => {
      setOrder(e.target.value);
    }

    const handleClick = (e : any) => {
      console.log('저장된 값: ', order);
    } //추후 연동 필요

    useEffect(() => setAIIsOpen(false), []);

    function open_toggle() {
        setIsVisible(prev => !prev);
        setTimeout(() => setIsOpen(prev => !prev), 80);
    }

    function AI_toggle() {
        setAIIsVisible(prev => !prev);
        setTimeout(() => setAIIsOpen(prev => !prev), 100);
    }


  return (
    <>
    <Menu isOpen={isOpen} isVisible={isVisible} open_toggle={open_toggle} AI_toggle={AI_toggle}/>
    <Calander_white AIIsOpen={AIIsOpen} AIIsVisible={AIIsVisible} AI_toggle={AI_toggle} handleClick={handleClick} handleOrder={handleOrder}/>
    </>
  )
}

export default App
