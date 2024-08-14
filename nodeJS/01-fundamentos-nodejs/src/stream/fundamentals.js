import { Readable, Writable, Transform } from 'node:stream';

class OneToAHundredStream extends Readable{
  index = 1;

  _read(){
    setTimeout(() =>{
      const i = this.index++

    if(i > 100){
      this.push(null)
    }else{
      const buff = Buffer.from(String(i));
      
      //push method is to return a value from a stream. if there is no value, it should return null.
      this.push(buff)
    }
    },1000)
  }
}

class MultiplyByTenStream extends Writable{
  _write(chunk, enconding, callback){
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new OneToAHundredStream().pipe(new MultiplyByTenStream());