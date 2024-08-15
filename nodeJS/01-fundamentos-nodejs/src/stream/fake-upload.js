import http from 'node:http'
import { Readable } from 'node:stream'

class OneToAHundredStream extends Readable{
  index = 0;

  _read(){
    setTimeout(() =>{
      const i = this.index++
      
      if(i > 100){
        this.push(null)
      }else{
        const buff = Buffer.from(String(i))

        this.push(buff)
      }


    },1000)
  }
}

const server = http.createServer();

server.listen(3334)

fetch('http://localhost:3333', {
  method: 'POST',
  body: new OneToAHundredStream(),
  duplex: 'half' // adicione essa linha
})