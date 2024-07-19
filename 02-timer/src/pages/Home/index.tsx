import { HandPalm, Play } from "@phosphor-icons/react";
import { HomeContainer, StartCountdownButton, StopCountdownButton  } from './styles';

import { useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

interface Cycle {
  id: string
  task: string
  duration: number
  startedDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

export function Home(){
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycledId ] = useState<string | null>( null );

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

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

  function handleInterruptCycle (){
    setCycles( state => 
      state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, interruptDate: new Date() }
      } else {
        return cycle
      }
      })
    );
    setActiveCycledId(null);
  }

  function handleCreateNewCycle (data:NewCycleFormData){
    const id = String(new Date().getTime());

    const newCycle:Cycle = {
      id,
      task: data.task,
      duration: data.duration,
      startedDate: new Date()
    }

    setCycles(state => [...state, newCycle]);//closure: toda vez que eu estou alterando um estado, e esse estado depende
    //da sua versão anterior, recomendavel eu utilizar o conceito de closure. alterar como uma função.
    //state => é o valor atual do meu estado.
    setActiveCycledId(id);
    setAmountSecondsPassed(0);
    reset();
  }

  const task = watch("task");
  const isSubmitDisable = !task;

  return (
    <HomeContainer >
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <NewCycleForm />
        <Countdown />

        {activeCycle ? 
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24}/>
            Interromper
          </StopCountdownButton> 
          :
          <StartCountdownButton type="submit" disabled={isSubmitDisable} >
            <Play size={24}/>
            Começar
          </StartCountdownButton>
        }
      </form>
    </HomeContainer>
  )
}