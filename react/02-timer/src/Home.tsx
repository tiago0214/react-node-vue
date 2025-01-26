import { createContext, useContext } from 'react'

const CyclesContext = createContext(2)

export function Cycles() {
  const cycles = useContext(CyclesContext)

  return <h1>Context: {cycles}</h1>
}

export function Countdown() {
  const cycles = useContext(CyclesContext)

  return <h1>Countdown: {cycles}</h1>
}

export function Home() {
  return (
    <div>
      <Cycles />
      <Countdown />
    </div>
  )
}
