import { HandPalm, Play } from '@phosphor-icons/react'
import {
  HomeContainer,
  InterruptCountdownButton,
  StartCountdownButton,
} from './styles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

const createNewTaskSchema = z.object({
  task: z.string().min(5),
  minutesAmount: z.number().min(1).max(60),
})

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedAt?: Date
}

type CreateNewCycleFormData = z.infer<typeof createNewTaskSchema>

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } =
    useForm<CreateNewCycleFormData>({
      resolver: zodResolver(createNewTaskSchema),
      defaultValues: {
        task: '',
        minutesAmount: 0,
      },
    })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsPassed = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        setAmountSecondsPassed(secondsPassed)

        if (secondsPassed >= totalSeconds) {
          clearInterval(interval)
          setActiveCycleId(null)

          setCycles((state) => {
            return state.map((cycle) => {
              if (cycle.id === activeCycleId)
                return {
                  ...cycle,
                  finishedAt: new Date(),
                }
              else return cycle
            })
          })
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])

  function handleCreateNewCycle(data: CreateNewCycleFormData) {
    const id = String(new Date().getTime())

    const cycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, cycle])

    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle() {
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptDate: new Date(),
          }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleId(null)
  }

  const currentSecond = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSecond / 60)
  const secondsPassed = currentSecond % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsPassed).padStart(2, '0')

  const task = watch('task')
  const isSubmitButtonDisabled = !task

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [activeCycle, minutes, seconds])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCycleForm />
        <Countdown />

        {activeCycle ? (
          <InterruptCountdownButton
            onClick={handleInterruptCycle}
            type="button"
          >
            <HandPalm size={24} />
            Interroper
          </InterruptCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitButtonDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
