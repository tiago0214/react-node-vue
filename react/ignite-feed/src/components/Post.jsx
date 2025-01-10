/* eslint-disable react/prop-types */
import { ptBR } from 'date-fns/locale';

import styles from './Post.module.css';
import { Comment } from './Comment';
import { Avatar } from './Avatar';
import { format } from 'date-fns';

export function Post({author,publishedAt}) {
  const publishedAtDateFormatted = format(publishedAt, "dd 'de' LLLL 'às' HH:MM", { locale: ptBR });

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedAtDateFormatted} dateTime="2020-05-11 08:30:00">{publishedAtDateFormatted}</time>
      </header>

      <div className={styles.content}>
        <p>Alo galera</p>
        <p>Tudo na santa paz</p>
        <p>Hi everyone</p>
        <p>
          <a href="#">#Finishing</a>{' '}
          <a href="#">#Almost</a>{' '}
          <a href="#">#there</a>{' '}
        </p>
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback!</strong>

        <textarea placeholder='Deixe um comentário'/>

        <footer>
          <button type='submit'>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        <Comment />
        <Comment />
        <Comment />
      </div>
    </article>
  )
}
