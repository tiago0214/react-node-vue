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

//keep in mind: writable stream never return a value. 
//it never convert the data in another format it just consume the data. And do something with it.
//if i need to convert(transform) the data in another format i should use Transform
class MultiplyByTenStream extends Writable{
  _write(chunk, enconding, callback){
    console.log(Number(chunk.toString()) * 10)
    callback()//this callback, you'll be the function that'll be called when it did the action "console.log"
  }
}

//transform stream: It is used when i need to transform the data in another thing
class InverseNumber extends Transform{
  _transform(chunck, enconding, callback){
    const transformed = Number(chunck.toString() * -1)

    callback(null, Buffer.from(String(transformed)))// this callback. will be the return value. first param => is the error handle
  }
}
//transform stream => needs to read data from somewhere and send data to somewhere. So it have to be placed in the middle
//like under.

new OneToAHundredStream()
  .pipe(new InverseNumber())
  .pipe(new MultiplyByTenStream());