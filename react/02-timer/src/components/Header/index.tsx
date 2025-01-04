import { HeaderContainer } from "./styles";
import { Timer, Scroll } from '@phosphor-icons/react'

import logoIgnite from '../../assets/logo-ignite.svg'
import { NavLink } from "react-router-dom";

export function Header(){
  return (
    <HeaderContainer>
      <span>
        <img src={logoIgnite} alt="" />
      </span>
      <nav>
        <NavLink to={'/'} title="timer">
          <Timer size={24}/>
        </NavLink>
        <NavLink to={'/history'} title="historico">
          <Scroll size={24}/>
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}