import { createContext, useContext, useState } from 'react'

const CycleContex = createContext({} as any);

function NewCycleForm(){
  const { activeCycle, setActiveCycle  } = useContext(CycleContex);

  return (
    <>
      <h1>new cycle {activeCycle}</h1>
      <button onClick={(() => setActiveCycle(2))}>Change value</button>
    </>
  )
}

function Countdown(){
  const { activeCycle } = useContext(CycleContex);

  return(
    <h1>count down: {activeCycle}</h1>
  )
}

export function Home(){
  const [ activeCycle, setActiveCycle ] = useState(0);

  return (
    <CycleContex.Provider value={{ activeCycle, setActiveCycle }}>
      <div>
        <NewCycleForm />
        <Countdown />
      </div>
    </CycleContex.Provider>
  )
}