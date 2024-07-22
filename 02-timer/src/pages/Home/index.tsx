import { HandPalm, Play } from "@phosphor-icons/react";
import { HomeContainer, StartCountdownButton, StopCountdownButton  } from './styles';
import * as zod from 'zod';
//preciso usar essa sintaxa: quando a minha biblioteca não tem o import default
import { zodResolver } from '@hookform/resolvers/zod';//integração entre o ZOD e o react hook form// react hook form

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { FormProvider, useForm } from "react-hook-form";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContexts";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  duration: zod.number().min(5).max(60)
})
//eu preciso criar dessa maneira, porque o meu zodResolver(), usa a validação como schemaBased, ou seja, eu preciso 
//representar corretamente a informação que ele vai validar. e os meus dados do useForm, são tratados como um objeto
//é so reparar do console.log() => dentro do handleSubmit -> ele passa os dados como objeto.

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home(){
  const { createNewCycle, interruptCurrentCycle, activeCycle } = useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema), //resolver: faz  integração entre o ZOD e o react hook form
    defaultValues: {
      task: '',
      duration: 0
    }
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const task = watch("task");
  const isSubmitDisable = !task;

  function handleCreateNewCycle(data: NewCycleFormData){
    createNewCycle(data);
    reset();
  }

  return (
    <HomeContainer >
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />

        {activeCycle ? 
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
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