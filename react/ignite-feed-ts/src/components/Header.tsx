import styles from './Header.module.css';

import igniteLogo from '../assets/ignite-symbol.svg';

export function Header() {
  return (
    <div className={styles.header}>
      <img src={igniteLogo} alt="" />
      <h1>Hello word</h1>
    </div>
  );
}