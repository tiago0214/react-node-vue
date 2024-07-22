import { createContext, ReactNode, useReducer, useState } from "react"
import { ActionTypes, Cycle, cyclesReducer } from "../reducers/cycles"

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
  })

  const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(0);

  const { activeCycleId, cycles } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function secondsPassed( seconds:number ){
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFineshed(){
    dispach({
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: {
        activeCycleId
      }
    });
  }

  function interruptCurrentCycle (){
    dispach({
      type: ActionTypes.INTERRUPT_ACTIVE_CYCLE,
      payload: {
        activeCycleId
      }
    });
  }

  function createNewCycle (data:CreateCycleData){
    const id = String(new Date().getTime());

    const newCycle:Cycle = {
      id,
      task: data.task,
      duration: data.duration,
      startedDate: new Date()
    }
    dispach({
      type: ActionTypes.CREATE_NEW_CYCLE,
      payload: {
        newCycle,
      }
    });

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