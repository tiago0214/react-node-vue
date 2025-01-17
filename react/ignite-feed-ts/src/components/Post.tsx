import { ptBR } from 'date-fns/locale';

import styles from './Post.module.css';
import { Comment } from './Comment';
import { Avatar } from './Avatar';
import { format, formatDistanceToNow } from 'date-fns';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content{
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostType{
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}


export function Post({post}: PostProps) {
  const [comments, setComments] = useState(['Post muito bacana hein?!']);

  const [newCommentText, setNewCommentText] = useState('');

  const publishedAtDateFormatted = format(post.publishedAt, "dd 'de' LLLL 'às' HH:MM", { locale: ptBR });

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt,{
    locale: ptBR,
    addSuffix: true
  });

  function handleOnSubmit(event: FormEvent){
    event.preventDefault();

    setComments([...comments, newCommentText]);

    setNewCommentText('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
    event.preventDefault();

    setNewCommentText(event.target.value);

    event.target.setCustomValidity('');
  }

  function deleteComment(commentToDelete:string){
    const newCommentsListWithoutDeleteOne = comments.filter((comment) =>{
      return comment !== commentToDelete
    })

    setComments(newCommentsListWithoutDeleteOne);
  }

  function invalidComment(event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('O campo precisa estar preenchido.');
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
          title={publishedAtDateFormatted} 
          dateTime={post.publishedAt.toISOString()}>
            {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map(line =>  {
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
          onInvalid={invalidComment}
          required
        />

        <footer>
          <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
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
