import { ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface TransactionType{
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionContextType{
  transactions: TransactionType[]
  fetchTransactions: (query?:string) => Promise<void>
  createTransaction: (data:CreateTransactionInput) => Promise<void>
}

export const TransactionContext = createContext({} as TransactionContextType);

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionProvider({children}: TransactionsProviderProps){
  const [ transactions, setTransactions ] = useState<TransactionType[]>([]);
  
  async function fetchTransactions(query?:string) {
    const response = await api.get('/transactions',{
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      }
    })

    setTransactions(response.data);
  }

  async function createTransaction (data:CreateTransactionInput){
    const {category, description, price, type} = data
    
    const response = await api.post('/transactions',{
      category,
      description,
      price,
      type,
      createdAt: new Date(),
    })

    setTransactions(state => [response.data,...state])
  }

  useEffect(()=>{
    fetchTransactions();
  },[])
  
  return(
    <TransactionContext.Provider value={{ 
        transactions,
        fetchTransactions,
        createTransaction 
      }}>
      {children}
    </TransactionContext.Provider>
  )
}