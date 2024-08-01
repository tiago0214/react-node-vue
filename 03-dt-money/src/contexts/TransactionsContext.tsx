import { createContext, ReactNode } from "react";

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

const TransactionContext = createContext({} as TransactionContextType);

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionProvider({children}: TransactionsProviderProps){
  
  return(
    <TransactionContext.Provider value={{ transactions : []}}>
      {children}
    </TransactionContext.Provider>
  )
}