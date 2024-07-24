import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./themes/default"
import { GlobalStyle } from "./global"
import { Transactions } from "./pages/Transactions"

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Transactions />
      <GlobalStyle />
    </ThemeProvider>
  ) 
}