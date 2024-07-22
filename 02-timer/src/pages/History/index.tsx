import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContexts";
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from "date-fns/locale/pt-BR";

export function History(){
  const { cycles } = useContext(CyclesContext);

  return(
    <HistoryContainer >
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(cycle => {
              return (
                <tr>
                  <td>{cycle.task}</td>
                  <td>{cycle.duration}</td>
                  <td>{formatDistanceToNow(cycle.startedDate,{
                    addSuffix: true,
                    locale: ptBR,
                  })}</td>
                  <td>
                    {cycle.finishedDate && <Status statusColor="green">Concluido</Status>}
                    {/* Se atentar, que a condição acima é um if => somente executa a segunda opção se a primeira === true */}
                    {cycle.interruptDate && <Status statusColor="red">Interrompido</Status>}
                    {(!cycle.finishedDate && !cycle.interruptDate) && <Status statusColor="yellow">Em andamento</Status>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}