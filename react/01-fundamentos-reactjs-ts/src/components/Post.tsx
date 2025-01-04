import { Avatar } from './Avatar';
import { format, formatDistanceToNow } from 'date-fns';
import { Comment } from './Comment';
import styles from './Post.module.css';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface Content {
  type: 'paragraph' | 'link',
  content: string
}

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType
}

export function Post ({ post }: PostProps){

  const [ comments, setComments ] = useState([
    "Post muito bacana hein!"
  ])
  
  const [ newCommentText, setNewCommentText ] = useState('');

  const publishedAtFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'")

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt,{
    addSuffix: true
  })

  function handleNewCommentChange (event: ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('');

    setNewCommentText(event.target.value);
    //se atentar, que ele vai ficar pegando todo o texto que estiver no text area. 
    //não somente o que eu apertar, eu usei {onChange}, ele é acionado para pegar todo o valor do text area.
  }

  function createComment (event: FormEvent) {
    event.preventDefault();

    setComments([ ...comments, newCommentText ]);

    setNewCommentText('');
  }

  function deleteComment (commentToDelet: string){
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentToDelet;
    });

    setComments(commentsWithoutDeletedOne);
  }

  function handleInvalidComment (event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('Este campo é obrigatório!');
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time 
          title={publishedAtFormatted} 
          dateTime={post.publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        { post.content.map((line) => {
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