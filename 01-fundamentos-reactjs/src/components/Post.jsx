import styles from './Post.module.css';

export function Post (){
  return (
    <article className={styles.post}>
        <header>
        <div className={styles.author}>
          <img 
            className={styles.avatar} 
            src="https://github.com/tiago0214.png" 
          />
          <div className={styles.authorInfo}>
            <strong>Tiago souza</strong>
            <span>Web developer</span>
          </div>
        </div>

        <time 
          title="3 de julho de 2024" 
          dateTime="2024-07-03 08:13:09">
          Publicado há 1h
        </time>
      </header>

      <div className={styles.content}>
        <p>Fala galeraa 👋</p>
        <p>Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀</p>
        <p><a href="">👉 jane.design/doctorcare</a></p>
        <p><a href="">#novoprojeto #nlw #rocketseat</a></p>
      </div>
    </article>
  )
}