
import { Header } from './components/Header.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { Post, PostType } from './components/Post.tsx';

import styles from './App.module.css'

import './global.css'

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/tiago0214.png",
      name: "Tiago Dias",
      role: "Web developer"
    },
    content:[
      {type: "paragraph", content: "Fala galeraa 👋"},
      {type: "paragraph", content: "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀"},
      {type: "link", content: "jane.design/doctorcare"}
    ],
    publishedAt: new Date('2024-07-03 08:13:09')
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/matheus0214.png",
      name: "Matheus Gomes",
      role: "Web developer"
    },
    content:[
      {type: "paragraph", content: "Fala galeraa 👋"},
      {type: "paragraph", content: "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀"},
      {type: "link", content: "jane.design/doctorcare"}
    ],
    publishedAt: new Date('2024-07-13 08:13:09')
  }
]

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
         {posts.map((post) =>{
          return (
            <Post 
              key={post.id}
              post={post}
            />
          )
         })}
        </main>
      </div>

    </div>
  )
}