import styles from './Avatar.module.css'

export function Avatar (props){
  return (
    // eslint-disable-next-line react/prop-types
    <img className={styles.avatar} src={props.src} />
  )
}