import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "@phosphor-icons/react";
import { SummaryContainer } from "./style";

export function Summary(){
  return(
    <SummaryContainer> 
      <div>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e"/>
        </header>

        <strong>R$: 17.400,00</strong>
      </div>

      <div>
        <header>
          <span>Saidas</span>
          <ArrowCircleDown size={32} color="#f75a68"/>
        </header>

        <strong>R$: 17.400,00</strong>
      </div>

      <div>
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff"/>
        </header>

        <strong>R$: 17.400,00</strong>
      </div>
    </SummaryContainer>
  )
}