import { Play } from "@phosphor-icons/react";
import { HomeContainer, CountContainer, FormContainer, Separator  } from './styles';

export function Home(){
  return (
    <HomeContainer >
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em </label>
          <input type="text" id="task"/>

          <label htmlFor="durantion">durante</label>
          <input type="number" id="durantion"/>

          <span>minutos</span>
        </FormContainer>

        <CountContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountContainer>

        <button type="submit">
          <Play size={24}/>
          Começar
        </button>
      </form>
    </HomeContainer>
  )
}