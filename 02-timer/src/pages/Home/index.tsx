import { Play } from "@phosphor-icons/react";
import { HomeContainer, CountContainer, FormContainer, Separator, StartCountdownButton, TaskInput, DurationInput  } from './styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';//integração entre o ZOD e o react hook form// react hook form
 //não tem nenhuma validação mas, ele faz a integracão com as bibliotecas que faz as validações.
import * as zod from 'zod';
import { useState } from "react";
//preciso usar essa sintaxa: quando a minha biblioteca não tem o import default

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  duration: zod.number().min(5).max(60)
})
//eu preciso criar dessa maneira, porque o meu zodResolver(), usa a validação como schemaBased, ou seja, eu preciso 
//representar corretamente a informação que ele vai validar. e os meus dados do useForm, são tratados como um objeto
//é so reparar do console.log() => dentro do handleSubmit -> ele passa os dados como objeto.

// interface NewCycleFormData {
//   task: string,
//   duration: number
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string
  task: string
  duration: number
}

export function Home(){
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [ activeCycleId, setActiveCycledId ] = useState<string | null>( null );
  const [amountSecondsPassed, setAmountSecondsPassed ] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema), //resolver: faz  integração entre o ZOD e o react hook form
    defaultValues: {
      task: '',
      duration: 0
    }
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.duration * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0 ;
  
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmout = currentSeconds % 60; 

  const minutes = String(minutesAmount).padStart(2,"0");
  const seconds = String(secondsAmout).padStart(2,"0")


  function handleCreateNewCycle (data:NewCycleFormData){
    const id = String(new Date().getTime());

    const newCycle:Cycle = {
      id,
      task: data.task,
      duration: data.duration
    }

    setCycles(state => [...state, newCycle]);//closure: toda vez que eu estou alterando um estado, e esse estado depende
    //da sua versão anterior, recomendavel eu utilizar o conceito de closure. alterar como uma função.
    //state => é o valor atual do meu estado.
    setActiveCycledId(id);

    reset();
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
          <span>${minutes[0]}</span>
          <span>${minutes[1]}</span>
          <Separator>:</Separator>
          <span>${seconds[0]}</span>
          <span>${seconds[1]}</span>
        </CountContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisable} >
          <Play size={24}/>
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}