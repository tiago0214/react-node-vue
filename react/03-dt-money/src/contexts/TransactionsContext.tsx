/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useEffect, useState } from "react";

interface Transaction{
  id: number
  description: string
  price: number
  type: "income" | "outcome"
  category: string
  createdAt: string
}

interface TransactionsContextType{
  transactions: Transaction[]
}

export const TransactionsContext = createContext({} as TransactionsContextType)

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionsProvider({children}: TransactionsProviderProps){
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

  return (
    <TransactionsContext.Provider value={{transactions}}>
      {children}
    </TransactionsContext.Provider>
  )
}