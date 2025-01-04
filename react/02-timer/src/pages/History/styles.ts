import styled from "styled-components";

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;
`;

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;// com isso ele vai fazer aparecer uma barra de rolagem se o conteudo do container for maior que o espaço
  //disponivel
  margin-top: 2rem;

  table{
    width: 100%;
    border-collapse: collapse;//
    min-width: 600px;//se tiver um tamanho menor, ele gere o scroll
    th{
      background-color: ${props => props.theme["gray-600"]};
      padding: 1rem;
      text-align: left;
      color: ${props => props.theme["gray-100"]};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child{
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child{
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    };

    td{
      background-color: ${props => props.theme["gray-700"]};
      border-top: 4px solid ${props => props.theme["gray-800"]};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child{
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child{
        /* border-top-right-radius: 8px; */
        padding-right: 1.5rem;
      }
    }
  }
`;

//explicação do collapse: quando eu coloco uma border 1px por exemplo, é para evitar que o elemento do lado também fique
//com 1px de border, ou seja renderizando na tela 2px. com isso ele vai dar collapse na border do lado do meu elemento

interface StatusProps {
  statuscolor: keyof typeof STATUS_COLORS
}
//com isso eu estou dizendo que os valores da minha propriedade, tem que server os tipos das propriedades do meu objeto

const STATUS_COLORS = {
  yellow : "yellow-500",
  green: "green-500",
  red: "red-500"
} as const

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before{
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${props => props.theme[STATUS_COLORS[props.statuscolor]]};
  }
`;