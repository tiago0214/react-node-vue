import { useForm } from "react-hook-form";
import { DurationInput, FormContainer, TaskInput } from "./styles";
import * as zod from 'zod';
//preciso usar essa sintaxa: quando a minha biblioteca não tem o import default
import { zodResolver } from '@hookform/resolvers/zod';//integração entre o ZOD e o react hook form// react hook form
 //não tem nenhuma validação mas, ele faz a integracão com as bibliotecas que faz as validações.


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  duration: zod.number().min(5).max(60)
})
//eu preciso criar dessa maneira, porque o meu zodResolver(), usa a validação como schemaBased, ou seja, eu preciso 
//representar corretamente a informação que ele vai validar. e os meus dados do useForm, são tratados como um objeto
//é so reparar do console.log() => dentro do handleSubmit -> ele passa os dados como objeto.

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;


export function NewCycleForm(){
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema), //resolver: faz  integração entre o ZOD e o react hook form
    defaultValues: {
      task: '',
      duration: 0
    }
  });

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