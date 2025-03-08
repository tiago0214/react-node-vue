import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHightlight, TransactionsContainer, TransactionsTable } from "./styles";

interface Transaction{
  id: number
  description: string
  price: number
  type: "income" | "outcome"
  category: string
  createdAt: string
}

export function Transactions(){
  const [ transactions, setTransactions ] = useState<Transaction[]>([])

  async function loadTransactions(){
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json()

    console.log(data)

    return setTransactions(data)
  }

  useEffect(() =>{
    loadTransactions()
  },[])

  return( 
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transaction => {
              return (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <PriceHightlight variant={transaction.type}>
                    {transaction.price}
                  </PriceHightlight>
                </td>
                <td>{transaction.category}</td>
                <td>{transaction.createdAt}</td>
              </tr>)
            }))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}