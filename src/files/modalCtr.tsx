import { useState, useCallback} from "react";
import '../App.css'

export function useModal(){
    const [isScheduleOpen, setIsScheduleOpen]= useState<boolean>(false); 
    const [isAIOpen, setIsAIOpen] = useState<boolean>(false);

    const openScheduleTab = useCallback(() => {
        setIsScheduleOpen(true);
        setIsAIOpen(false);
    }, [setIsAIOpen, setIsScheduleOpen]);
    const openAITab = useCallback(() => {
        setIsAIOpen(true);
        setIsScheduleOpen(false)
    }, [setIsAIOpen, setIsScheduleOpen]);
    const close = useCallback(() => {
        setIsScheduleOpen(false);
        setIsAIOpen(false);
    }, [setIsAIOpen, setIsScheduleOpen]);

    return { isScheduleOpen, isAIOpen, openScheduleTab, openAITab, close};

}

