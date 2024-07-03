import { Post } from './Post';
import { Header } from './components/Header';

import styles from './App.module.css'

import './global.css'
import { Sidebar } from './components/Sidebar';

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post 
            author="Tiago Souza"
            content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi eos repellat assumenda. Suscipit soluta omnis, facilis, voluptate aspernatur magnam perferendis molestiae nisi eos vitae veniam, quibusdam dolorum explicabo illum quaerat?"
          />
          <Post 
            author="Shara Lorrany"
            content="Um post muito legal!"
          />
        </main>
      </div>

    </div>
  )
}