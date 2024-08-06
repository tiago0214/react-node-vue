import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./style";
import { ArrowCircleDown, ArrowCircleUp, X } from "@phosphor-icons/react";
import * as z from 'zod';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionsContext";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income','outcome'])
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal(){
  const { createTransaction } = useContext(TransactionContext);

  const { 
    control, 
    register,
    handleSubmit,
    formState:{ isSubmitting},
    reset
  } = useForm<NewTransactionFormInputs>({
    defaultValues: {
      type: 'income'
    },
    resolver: zodResolver(newTransactionFormSchema)
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs){
    const {category,description,price,type} = data;

    await createTransaction({
      category,
      description,
      price,
      type
    })
    
    reset();
  }

  return (
      <Dialog.Portal>
        <Overlay/> {/* Overlay é para aparecer o fundo embaçado */}

        <Content>
          <Dialog.Title>Nova transação</Dialog.Title>

          <CloseButton>
            <X size={24}/>
          </CloseButton>

          <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input 
              type="text" 
              placeholder="Descrição" 
              required
              {...register("description")}
            />
            <input 
              type="number" 
              placeholder="Preço" 
              required
              {...register("price", { valueAsNumber: true })}
            />
            <input 
              type="text" 
              placeholder="Categoria" 
              required
              {...register("category")}
            />

            <Controller 
              control={control}
              name= 'type'
              render = {({field}) => {
                
                //field: onde esta os eventos, e é por lá que conseguimos alterar o valor desse campo.
                //fieldState: tras informaçoes sobre o meu campo, nesse caso, do campo 'type'. Ex: algum erro nesse campo. 
                //formState: retorna as informações sobre o contexto do formulário. Ex: isSubmitting

                //o onChange, é a função que vai salvar o valor dentro do formulário. ou seja, essa é a API que eu preciso.
                //para anotar o valor do campo dentro do formulário.
                //o value: é o valor atual desse campo.
                  
                //onValueChange: é uma props que é:event listner e é chamado toda vez que o valor é alterado. => é do radix
                //field.onChange => função do hook form que envia o valor do campo para o handleSubmit
                return(
                  <TransactionType onValueChange={field.onChange} value={field.value}>
                    {/* value={field.value} => se eu quiser iniciar com um valor padrão */}
                    <TransactionTypeButton variant="income" value="income"> 
                      <ArrowCircleUp size={24}/>
                      Entrada
                    </TransactionTypeButton >
                    <TransactionTypeButton variant="outcome" value="outcome"> 
                      <ArrowCircleDown size={24} /> 
                      Saida
                    </TransactionTypeButton >
                  </TransactionType>
                )
              }}
            />

            <button type="submit" disabled={isSubmitting}>
              Cadastrar
            </button>
          </form>

        </Content>
      </Dialog.Portal>
  )
}