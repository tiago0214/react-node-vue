import { HeaderContainer } from "./styles";

import igniteLogo from '../../assets/ignite-logo.svg'
import { Scroll, Timer } from "@phosphor-icons/react";
import { NavLink } from "react-router";

export function Header(){
  return (
    <HeaderContainer>
      <img src={igniteLogo} alt="" />
      <nav>
        <NavLink to="/"><Timer size={24}/></NavLink>
        <NavLink to="/history"><Scroll size={24}/></NavLink>
      </nav>
    </HeaderContainer>
  )
}