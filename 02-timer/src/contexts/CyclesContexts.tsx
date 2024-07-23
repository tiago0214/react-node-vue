import { createContext, ReactNode, useEffect, useReducer, useState } from "react"
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer"
import { createNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/action"
import { differenceInSeconds } from "date-fns"

interface CreateCycleData {
  task: string
  duration: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFineshed: () => void
  secondsPassed: (seconds:number) => void
  createNewCycle: (data:CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps{
  children: ReactNode
}

export function CyclesContextProvider({ children }:CyclesContextProviderProps){
  const [ cyclesState, dispach ] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId : null
  }, (initialState) => {
    const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state@1.0');

    if(storedStateAsJSON){
      return JSON.parse(storedStateAsJSON);//é o valor que vai tentar recuperar para o meu cyclesState:
    }

    return initialState//caso o usuário não tenha nada no storage: evitar bug
  })//esse terceiro parametro do reducer sempre precisa retornar algo.

  const { activeCycleId, cycles } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(() =>{
    if(activeCycle){
      return differenceInSeconds(new Date(), activeCycle.startedDate)
    }

    return 0
  });

  useEffect(()=>{
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem('@ignite-timer:cycles-state@1.0', stateJSON)
  },[cyclesState])


  function secondsPassed( seconds:number ){
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFineshed(){
    dispach(markCurrentCycleAsFinishedAction());
  }

  function interruptCurrentCycle (){

    // dispach({
    //   type: ActionTypes.INTERRUPT_ACTIVE_CYCLE,
    //   // payload: {
    //   //   activeCycleId
    //   // }
    // });
    dispach(interruptCurrentCycleAction());
  }

  function createNewCycle (data:CreateCycleData){
    const id = String(new Date().getTime());

    const newCycle:Cycle = {
      id,
      task: data.task,
      duration: data.duration,
      startedDate: new Date()
    }
    dispach(createNewCycleAction(newCycle));

    //setCycles(state => [...state, newCycle]);//closure: toda vez que eu estou alterando um estado, e esse estado depende
    //da sua versão anterior, recomendavel eu utilizar o conceito de closure. alterar como uma função.
    //state => é o valor atual do meu estado.
    setAmountSecondsPassed(0);
    // reset();
  }

  return (
    <CyclesContext.Provider value={{
      cycles,
      activeCycle,
      activeCycleId,
      markCurrentCycleAsFineshed,
      secondsPassed,
      amountSecondsPassed,
      createNewCycle,
      interruptCurrentCycle
      }}>
      {children}
    </CyclesContext.Provider>
  )
}