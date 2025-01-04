
import styles from './Post.module.css';

export function Post(){
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <img className={styles.avatar} src="https://github.com/tiago0214.png"/>
          <div className={styles.authorInfo}>
            <strong>Tiago Souza</strong>
            <span>Web developer</span>
          </div>
        </div>

        <time title="11 de maio 2020" dateTime="2020-05-11 08:30:00">Publicado há 1H</time>
      </header>

      <div className={styles.content}>
        <p>Alo galera</p>
        <p>Tudo na santa paz</p>
        <p>Hi everyone</p>
        <p><a href="#">Finishing</a></p>
      </div>
    </article>
  )
}
