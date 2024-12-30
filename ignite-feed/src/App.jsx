import { Header } from "./components/Header";

import styles from './App.module.css';
import { Sidebar } from "./components/Sidebar";

export function App() {
  return (
    <div>
      <Header/>
        <div className={styles.wrapper}>
          <Sidebar/>
          
          <main>
            <p>p1</p>
            <p>p2</p>
          </main>
        </div>
    </div>
  )
}