import { HeaderContainer, HeaderContent, NewTransactionButton } from "./style";
import * as Dialog from '@radix-ui/react-dialog';// => assim eu importo tudo como um objeto
// import { Root as DialogRoot } from '@radix-ui/react-dialog'; eu posso nomear uma importação, mesmo que seja named.
//DialogRoot => eu que escolhi esse nome, posso usar o nome que eu quiser

import logo from '../../assets/logo.svg'
import { NewTransactionModal } from "../NewTransactionModal";

export function Header(){
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logo} alt="" />

        <Dialog.Root> 
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova Transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}