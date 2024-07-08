import styles from './Avatar.module.css';
import { ImgHTMLAttributes } from 'react';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean
}

//...props: estou usando REST OPERATOR, para pegar todas as propriedades restantes e juntar em um objeto.
//mas se atentar que isso funciona porque eu estou desestruturando. se eu não fisesse isso, ele ia ignorar todo o resto
//igual os exemplos que eu fiz no arquivo de test/retornos
export function Avatar ({ hasBorder = true, ...props}:AvatarProps){
  return(
    <img 
      className={hasBorder ? styles.avatarWithBorder : styles.avatar } 
      {...props}//já aqui, eu estou usando o spreed operator, para espalhar o conteudo do meu objeto props.
    />
  )
}

//é literalmente igual, ao meu arquivo de testes/retornos. Eu tiro hasBorder, do objeto que eu recebo e o resto das
//propriedades eu coloco em um novo objeto