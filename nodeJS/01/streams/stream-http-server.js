import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumber extends Transform{
  _transform(chunck, encondig, callback){
    const transformedNumber = Number(chunck.toString()) * -1

    console.log(transformedNumber)

    callback(null, transformedNumber.toString())
  }
}

const server = http.createServer(async(req,res)=>{
  const buffer = []

  for await (let chunk of req){
    console.log(chunk)

    buffer.push(chunk)
  }
  
  const allData = Buffer.concat(buffer).toString()

  console.log(allData)

  return res.end(allData)
  // req.pipe(new InverseNumber())
})

server.listen(3334)

// await com o for, é para trabalhar com stream, e eu quero percorre-la
// await não deixa nada ser percorrido enquato não terminar de receber toda a stream
// ideal, quando eu não posso trabalhar com somente os pedacinhos, mas eu preciso dela inteira. 