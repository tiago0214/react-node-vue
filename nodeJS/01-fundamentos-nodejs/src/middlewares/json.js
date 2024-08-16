export async function json(req,res){
  const buff = [];

  for await (const chunck of req){
    buff.push(chunck)
  }

  try{
    req.body = JSON.parse(Buffer.concat(buff).toString())
  }catch{
    req.body = null
  }

  res.setHeader('Content-type', 'application/json')
}