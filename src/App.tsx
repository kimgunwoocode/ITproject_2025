//추후 수정 요망
import './App.css'
import Modal from 'react-modal'
import { useModal } from './files/modalCtr';
import { Calendar } from './files/calendar';
import { AIPrompt } from './files/AITab';
import { ScheduleList } from './files/ScheduelTab';

Modal.setAppElement('#root');

//메뉴 : 모달 위에도 띄우기
function Menu({openScheduleTab, openAITab, close} : {openScheduleTab : () => void, openAITab : () => void, close : () => void}) {
  return (
    <nav className='menu'>
      <button onClick={close} className='button1'>달력</button>
      <button onClick={openScheduleTab} className='button1'>일정</button>
      <button onClick={openAITab} className='button1'>AI</button>
      <div className='menu_space'></div>
      <div className='login_menu'>로그인 메뉴 &#40;제작 예정&#41;</div>
    </nav>
  );
}


//모달1 : 일정 표로 나타내기 적기
function ScheduleTab({isScheduleOpen, openAITab, openScheduleTab, close} : {isScheduleOpen : boolean, openAITab : () => void, openScheduleTab : () => void; close : () => void}) {
  return (
    <Modal isOpen={isScheduleOpen} className='modal'>
      <Menu openScheduleTab={openScheduleTab} openAITab={openAITab} close={close}/>
      <ScheduleList/>
      <Ad />
    </Modal>
  );
}

//모달2 : AI 입력칸
function AITab({isAIOpen, openAITab, openScheduleTab, close} : {isAIOpen : boolean, openAITab : () => void, openScheduleTab : () => void; close : () => void}) {
  return(
    <Modal isOpen={isAIOpen} className='modal'>
      <Menu openScheduleTab={openScheduleTab} openAITab={openAITab} close={close} />
      <AIPrompt />
      <Ad/>
    </Modal>
  );
}

//모달3 : 광고
function Ad() {
  return (
    <div className='ad'></div>
  );
}

//메인
function App() {
  const modalControl = useModal();

  return (
    <>
      <header>
        <Menu {...modalControl}/>
      </header>
      {/*메인 : 달력과 광고*/}
      <div className='main'>
        <Calendar />
        <Ad />
        {modalControl.isScheduleOpen && <ScheduleTab {...modalControl}/>}
        {modalControl.isAIOpen && <AITab {...modalControl}/>}
      </div>
    </>
  )
}

export default App
