import 'styled-components';
import { defaultTheme } from '../styles/themes/default';

//eu estou pegando a inferência de tipo do typescript, e colocando fixo no ThemeType
type ThemeType = typeof defaultTheme;

declare module 'styled-components'{
  export interface DefaultTheme extends ThemeType{}
}