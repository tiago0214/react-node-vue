import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { SearchFormContainer } from "./style";

export function SearchForm(){
  return(
    <SearchFormContainer>
      <input type="text" placeholder="Busque por transações"></input>

      <button type="submit">
        <MagnifyingGlass size={20}/>
        Buscar
      </button>
    </SearchFormContainer>
  )
}