import { HandPalm, Play } from '@phosphor-icons/react'
import {
  HomeContainer,
  InterruptCountdownButton,
  StartCountdownButton,
} from './styles'
import { Countdown } from './components/Countdown'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewCycleForm } from './components/NewCycleForm'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CycleContext'

const createNewTaskSchema = z.object({
  task: z.string().min(5),
  minutesAmount: z.number().min(1).max(60),
})

type CreateNewCycleFormData = z.infer<typeof createNewTaskSchema>

export function Home() {
  const { createNewCycle, activeCycle, interruptActiveCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<CreateNewCycleFormData>({
    resolver: zodResolver(createNewTaskSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch /*reset*/ } = newCycleForm
  const task = watch('task')
  const isSubmitButtonDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <InterruptCountdownButton
            onClick={interruptActiveCycle}
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
