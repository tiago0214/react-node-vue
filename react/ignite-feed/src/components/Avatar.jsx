import styles from './Avatar.module.css'

// eslint-disable-next-line react/prop-types
export function Avatar ({hasborder = true, src}){
  return (
    <img className={hasborder ? styles.avatar : styles.avatarWithoutBorder } src={src} />
  )
}