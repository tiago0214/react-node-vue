// process.stdin.pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'

// ele lê os dados. Retorna os dados aos poucos
class OneToHundred extends Readable{
  index = 1

  _read(){
    setTimeout(()=>{
      let i = this.index++

      if(i > 100){
        this.push(null)
      }else{
        this.push(i.toString())
      }
    },1000)
  }
}

class InverseNumber extends Transform{
  _transform(chunk,encondig,callback){
    const transformedNumber = Number(chunk) * -1

    callback(null, transformedNumber.toString())
  }
}

// ele envia os dados. Ela somente processa os dados, ela não transforma os dados em nada. Nem retorna nada
class MultiplyByTen extends Writable{
  _write(chunk, encondig, callback){
    console.log(Number(chunk.toString()) * 10)

    callback()
  } 
}


new OneToHundred()
  .pipe(new InverseNumber)
  .pipe(new MultiplyByTen())

// não sei se o conceito vale somente para node: mas prof, falou que Buffer no node, é para transicionar dados entre streams


// Se atentar na stream DUPLEX, leitura e escrita na mesma stream. 
// ex: arquivo de físico to sistema. Eu consigo ler ele e consigo escrever nele. Mas eu não posso transformar algo dentro dele.