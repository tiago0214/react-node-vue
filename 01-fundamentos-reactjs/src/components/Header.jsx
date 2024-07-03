import styles from './Header.module.css'

import imagemLogo from '../assets/ignite-logo.svg'

export function Header(){
  return (
    <header className={styles.header}>
      <img src={imagemLogo} alt="Imagem do logo do ignite" />
    </header>
  )
}