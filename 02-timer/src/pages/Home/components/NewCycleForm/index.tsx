import { DurationInput, FormContainer, TaskInput } from "./styles";

import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContexts";
 //não tem nenhuma validação mas, ele faz a integracão com as bibliotecas que faz as validações.

export function NewCycleForm(){
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return(
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em </label>
      <TaskInput 
        type="text" 
        id="task" 
        placeholder="Dê um nome para o seu projeto"
        list="task-suggestion"
        {...register('task')}
        disabled={!!activeCycle}
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
        disabled={!!activeCycle}
        {...register('duration',{ valueAsNumber: true})}
      />

      <span>minutos</span>
    </FormContainer>
  )
}