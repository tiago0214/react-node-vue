import { ButtonContainer, VariantButton } from "./ButtonContainer.styles";

interface Variant {
  variant: VariantButton
}

export function Button( { variant } : Variant){
  return <ButtonContainer variant={variant} >Enviar</ButtonContainer>
}