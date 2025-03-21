// process.stdin.pipe(process.stdout)

import { Readable, Writable } from 'node:stream'

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

class MultiplyByTen extends Writable{
  _write(chunk, encondig, callback){
    console.log(Number(chunk.toString()) * 10)

    callback()
  } 
}


new OneToHundred().pipe(new MultiplyByTen())