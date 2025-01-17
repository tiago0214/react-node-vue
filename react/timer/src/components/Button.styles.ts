import styled from 'styled-components';

export type Variant = 'primary' | 'secondary' | 'success' | 'danger';

interface ButtonContainerProps{
  variant: Variant
}

const getBackgroundColor = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;

  ${props => {
    return `background-color: ${getBackgroundColor[props.variant]};`
  }}
`