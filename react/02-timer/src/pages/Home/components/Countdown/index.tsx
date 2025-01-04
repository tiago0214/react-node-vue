import { useContext, useEffect } from "react";
import { CountContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContexts";

export function Countdown(){
  const { activeCycle, activeCycleId, markCurrentCycleAsFineshed, amountSecondsPassed, secondsPassed } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.duration * 60 : 0;

  useEffect(() =>{
    let interval:number;
    
    if(activeCycle){
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), activeCycle.startedDate);
        if(secondsDifference >= totalSeconds){
          markCurrentCycleAsFineshed();

          secondsPassed(totalSeconds);

          clearInterval(interval);
        }else{
          secondsPassed(secondsDifference);
        }
      },1000)
    }
    return () => { 
      clearInterval(interval)
    };
  },[activeCycle, activeCycleId, totalSeconds, markCurrentCycleAsFineshed, secondsPassed])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0 ;
  
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmout = currentSeconds % 60; 

  const minutes = String(minutesAmount).padStart(2,"0");
  const seconds = String(secondsAmout).padStart(2,"0");

  useEffect(()=>{
    if(activeCycle){
      document.title = `${minutes} : ${seconds}` 
    }
  },[minutes, seconds, activeCycle]);

  return (
    <CountContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountContainer>
  )
}