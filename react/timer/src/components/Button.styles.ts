import styled from 'styled-components';

export type Variant = 'primary' | 'secondary' | 'success' | 'danger';

export const ButtonContainer = styled.button`
  width: 100px;
  height: 40px;

  background-color: ${props => props.theme['green-500']};
`