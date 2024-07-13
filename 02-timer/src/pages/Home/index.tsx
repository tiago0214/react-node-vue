import { Play } from "@phosphor-icons/react";
import { HomeContainer, CountContainer, FormContainer, Separator, StartCountdownButton, TaskInput, DurationInput  } from './styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';//integração entre o ZOD e o react hook form// react hook form
 //não tem nenhuma validação mas, ele faz a integracão com as bibliotecas que faz as validações.
import * as zod from 'zod';
//preciso usar essa sintaxa: quando a minha biblioteca não tem o import default

const newCycleFormValidationSchema = zod.object({
  
})

export function Home(){
  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver()
  });

  function handleCreateNewCycle (data:any){
    console.log(data);
  }

  const task = watch("task");
  const isSubmitDisable = !task;

  return (
    <HomeContainer >
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em </label>
          <TaskInput 
            type="text" 
            id="task" 
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestion"
            {...register('task')}
          />
          {/* O register, esta pegando todos os métodos e retornando como propriedade do meu componente*/}
          <datalist id="task-suggestion">
            <option value="projeto 1" />
            <option value="projeto 2" />
            <option value="projeto 3" />
          </datalist>

          <label htmlFor="durantion">durante</label>
          <DurationInput 
            type="number" 
            id="durantion" 
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('duration',{ valueAsNumber: true})}
          />

          <span>minutos</span>
        </FormContainer>

        <CountContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisable} >
          <Play size={24}/>
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}