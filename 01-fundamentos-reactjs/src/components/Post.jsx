/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Avatar } from './Avatar';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { Comment } from './Comment';
import styles from './Post.module.css';
import { useState } from 'react';


export function Post ({ author, publishedAt, content }){
  const [ comments, setComments ] = useState([
    "Post muito bacana hein!"
  ])
  
  const [ newCommentText, setNewCommentText ] = useState('');

  const publishedAtFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'",{
    locale: ptBR
  })

 const publishedDateRelativeToNow = formatDistanceToNow(publishedAt,{
  locale:ptBR,
  addSuffix: true
 })

  function handleNewCommentChange (){
    event.target.setCustomValidity('');

    setNewCommentText(event.target.value);
    //se atentar, que ele vai ficar pegando todo o texto que estiver no text area. 
    //não somente o que eu apertar, eu usei {onChange}, ele é acionado para pegar todo o valor do text area.
  }

  function createComment () {
    event.preventDefault();

    setComments([ ...comments, newCommentText ]);

    setNewCommentText('');
  }

  function deleteComment (commentToDelet){
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentToDelet;
    });

    setComments(commentsWithoutDeletedOne);
  }

  function handleInvalidComment (){
    event.target.setCustomValidity('Este campo é obrigatório!');
  }

  const isNewCommentEmpty = newCommentText.length === 0;

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
            title={publishedAtFormatted} 
            dateTime={publishedAt.toISOString()}>
            {publishedDateRelativeToNow}
          </time>
        </header>

      <div className={styles.content}>
        { content.map((line) => {
          if( line.type === 'paragraph' ) {
            return <p key= { line.content }>{ line.content }</p>
          }else if( line.type === 'link' ){
            return <p key= { line.content }><a href='#'>{ line.content }</a></p>
          }
        })}
      </div>

      <form onSubmit={createComment} className={styles.commentForm}>
        <strong>Deixe seu feedback!</strong>

        <textarea 
          name= "comment"
          value= {newCommentText}
          placeholder= "Deixe um comentário!"
          onChange= {handleNewCommentChange}
          onInvalid= {handleInvalidComment}
          required = {true}
        />

        <footer>
          <button type="submit" disabled={ isNewCommentEmpty } >Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map( comment => <Comment key={comment} content={comment} onDeleteComment={deleteComment} />)}
      </div>

    </article>
  )
}