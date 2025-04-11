// @ts-nocheck
import {Readable} from 'node:stream'

class OneToHundred extends Readable{
  index = 1

  _read(){
    setTimeout(()=>{
      let i = this.index++

      if(i > 5){
        this.push(null)
      }else{
        this.push(i.toString())
      }
    },1000)
  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundred(),
  duplex: 'half'
}).then((response) =>{
  return response.text()
}).then((data) =>{
  console.log(data)
})