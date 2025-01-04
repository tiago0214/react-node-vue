import 'styled-components';//sem esse import, eu estou dizendo que eu quero sobrescrever toda a tipagem la em baixo
import { defaultTheme } from '../themes/default';

type ThemeType = typeof defaultTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType{}
}