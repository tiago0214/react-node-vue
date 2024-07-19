import { useEffect, useState } from "react";
import { CountContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";

export function Countdown(){
  const [amountSecondsPassed, setAmountSecondsPassed ] = useState(0);

  const totalSeconds = activeCycle ? activeCycle.duration * 60 : 0;

  useEffect(() =>{
    let interval:number;

    if(activeCycle){
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), activeCycle.startedDate);

        if(secondsDifference >= totalSeconds){
          setCycles((state) =>  state.map((cycle) => {
              if(cycle.id === activeCycleId ){
                return { ...cycle, finishedDate: new Date()}
              }else{
                return cycle
              }
          }))
  
          setAmountSecondsPassed(totalSeconds);
          clearInterval(interval);
        }else{
          setAmountSecondsPassed(secondsDifference);
        }
      },1000)
    }
    return () => { 
      clearInterval(interval)
    };
  },[activeCycle, activeCycleId, totalSeconds, cycles])

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