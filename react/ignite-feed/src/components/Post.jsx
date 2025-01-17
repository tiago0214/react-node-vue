/* eslint-disable react/prop-types */
import { ptBR } from 'date-fns/locale';

import styles from './Post.module.css';
import { Comment } from './Comment';
import { Avatar } from './Avatar';
import { format, formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

export function Post({author,publishedAt,content}) {
  const [comments, setComments] = useState(['Post muito bacana hein?!']);

  const [newCommentText, setNewCommentText] = useState('');

  const publishedAtDateFormatted = format(publishedAt, "dd 'de' LLLL 'às' HH:MM", { locale: ptBR });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt,{
    locale: ptBR,
    addSuffix: true
  });

  function handleOnSubmit(){
    event.preventDefault();

    setComments([...comments, newCommentText]);

    setNewCommentText('');
  }

  function handleNewCommentChange(){
    event.preventDefault();

    setNewCommentText(event.target.value);
  }

  function deleteComment(commentToDelete){
    const newCommentsListWithoutDeleteOne = comments.filter((comment) =>{
      return comment !== commentToDelete
    })

    setComments(newCommentsListWithoutDeleteOne);
  }

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

        <time 
          title={publishedAtDateFormatted} 
          dateTime={publishedAt.toISOString()}>
            {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line =>  {
          if(line.type == 'paragraph'){
            return <p key={line.content}>{line.content}</p>;
          }else{
            return <p key={line.content}><a href='#'>{line.content}</a></p>;
          }
        })}
      </div>

      <form onSubmit={handleOnSubmit} className={styles.commentForm}>
        <strong>Deixe seu feedback!</strong>

        <textarea 
          onChange={handleNewCommentChange} 
          placeholder='Deixe um comentário'
          value={newCommentText}
        />

        <footer>
          <button type='submit'>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment 
              key={comment} 
              content={comment}
              deleteComment={deleteComment}
            ></Comment>
          )
        })}
      </div>
    </article>
  )
}
