import { HandPalm, Play } from "@phosphor-icons/react";
import { HomeContainer, StartCountdownButton, StopCountdownButton  } from './styles';
import * as zod from 'zod';
//preciso usar essa sintaxa: quando a minha biblioteca não tem o import default
import { zodResolver } from '@hookform/resolvers/zod';//integração entre o ZOD e o react hook form// react hook form
import { createContext, useState } from "react";

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { FormProvider, useForm } from "react-hook-form";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  duration: zod.number().min(5).max(60)
})
//eu preciso criar dessa maneira, porque o meu zodResolver(), usa a validação como schemaBased, ou seja, eu preciso 
//representar corretamente a informação que ele vai validar. e os meus dados do useForm, são tratados como um objeto
//é so reparar do console.log() => dentro do handleSubmit -> ele passa os dados como objeto.

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

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
}

export const CyclesContext = createContext({} as CyclesContextType);

export function Home(){
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycledId ] = useState<string | null>( null );
  const [amountSecondsPassed, setAmountSecondsPassed ] = useState(0);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema), //resolver: faz  integração entre o ZOD e o react hook form
    defaultValues: {
      task: '',
      duration: 0
    }
  });

  const { handleSubmit, watch, reset } = newCycleForm;

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
        <CyclesContext.Provider value={{
          activeCycle,
          activeCycleId,
          markCurrentCycleAsFineshed,
          secondsPassed,
          amountSecondsPassed
          }}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

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