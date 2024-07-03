import { Post } from './Post';
import { Header } from './components/Header';

import './global.css'

export function App() {
  return (
    <div>
      <Header />
      <Post 
        author="Tiago Souza"
        content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi eos repellat assumenda. Suscipit soluta omnis, facilis, voluptate aspernatur magnam perferendis molestiae nisi eos vitae veniam, quibusdam dolorum explicabo illum quaerat?"
      />
    </div>
  )
}