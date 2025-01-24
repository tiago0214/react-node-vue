import { HandPalm, Play } from '@phosphor-icons/react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  InterruptCountdownButton,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

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
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            placeholder="Dê um nome para o seu projeto"
            id="task"
            list="task-suggestions"
            {...register('task')}
            disabled={!!activeCycle}
          />

          <datalist id="task-suggestions">
            <option value="projeto 1" />
            <option value="projeto 2" />
            <option value="maçã" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            placeholder="00"
            type="number"
            id="minutesAmount"
            step={5}
            min={1}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
            disabled={!!activeCycle}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

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
