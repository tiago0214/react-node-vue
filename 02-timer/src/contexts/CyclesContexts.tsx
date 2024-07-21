import { createContext, useState } from "react"

interface CreateCycleData {
  task: string
  duration: number
}

interface Cycle {
  id: string
  task: string
  duration: number
  startedDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFineshed: () => void
  secondsPassed: (seconds:number) => void
  createNewCycle: (data:CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType);


export function CyclesContextProvider(){
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycledId ] = useState<string | null>( null );
  const [amountSecondsPassed, setAmountSecondsPassed ] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function secondsPassed( seconds:number ){
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFineshed(){
    setCycles((state) =>  state.map((cycle) => {
      if(cycle.id === activeCycleId ){
        return { ...cycle, finishedDate: new Date()}
      }else{
        return cycle
      }
    }))
  }

  function interruptCurrentCycle (){
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

  function createNewCycle (data:CreateCycleData){
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
    // reset();
  }

  return (
    <CyclesContext.Provider value={{
      activeCycle,
      activeCycleId,
      markCurrentCycleAsFineshed,
      secondsPassed,
      amountSecondsPassed,
      createNewCycle,
      interruptCurrentCycle
      }}>
    </CyclesContext.Provider>
  )
}