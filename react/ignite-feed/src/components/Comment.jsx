import { ThumbsUp, Trash } from "@phosphor-icons/react";
import styles from "./Comment.module.css";
import { Avatar } from "./Avatar";

export function Comment({content}) {
  return(
    <div className={styles.comment}>
      <Avatar hasborder={false} src="https://github.com/tiago0214.png"/>

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.userAndTime}>
              <strong>Tiago Souza</strong>
              <time title="11 de maio 2020" dateTime="2020-05-11 08:30:00">cerca de 1h atrás</time>
            </div>

            <button title="Delete comment">
              <Trash size={24}/>
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button>
            <ThumbsUp />
            Aplaudir <span>22</span>
          </button>
        </footer>
      </div>
    </div>
  );
}