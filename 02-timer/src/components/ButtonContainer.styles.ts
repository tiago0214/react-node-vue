import styled, { css } from "styled-components"

export type VariantButton = 'primary' | 'secondary' | 'danger'  | 'success';

interface Variant {
  variant: VariantButton
}

const colors = {
  primary: 'purple',
  secondary: 'yellow' ,
  danger: 'red',
  success: 'green'
}

export const ButtonContainer = styled.button<Variant>`
  width: 100px;
  height: 40px;
  margin: 8px;
  border-radius: 8px;
  cursor: pointer;
  border: 0;
  color: ${props => props.theme.white};

  background-color: ${props => props.theme['green-500']};

  /* ${(props) => {
    return css`background-color: ${colors[props.variant]}`
  }} */
`