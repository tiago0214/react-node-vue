import { Play } from "@phosphor-icons/react";
import { HomeContainer, CountContainer, FormContainer, Separator, StartCountdownButton, TaskInput, DurationInput  } from './styles';

export function Home(){
  return (
    <HomeContainer >
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em </label>
          <TaskInput type="text" id="task" placeholder="Dê um nome para o seu projeto"/>

          <label htmlFor="durantion">durante</label>
          <DurationInput type="number" id="durantion" placeholder="00"/>

          <span>minutos</span>
        </FormContainer>

        <CountContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountContainer>

        <StartCountdownButton type="submit" disabled>
          <Play size={24}/>
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}