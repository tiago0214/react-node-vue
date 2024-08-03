import { createContext, ReactNode, useEffect, useState } from "react";

interface TransactionType{
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createAt: string
}

interface TransactionContextType{
  transactions: TransactionType[]
}

export const TransactionContext = createContext({} as TransactionContextType);

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionProvider({children}: TransactionsProviderProps){
  const [ transactions, setTransactions ] = useState<TransactionType[]>([]);
  
  async function loadTransactions() {
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(()=>{
    loadTransactions();
  },[])
  
  return(
    <TransactionContext.Provider value={{ transactions }}>
      {children}
    </TransactionContext.Provider>
  )
}