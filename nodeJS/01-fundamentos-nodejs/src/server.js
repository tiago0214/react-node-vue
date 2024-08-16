import http from 'node:http';

const users = []

const server = http.createServer(async (req,res)=>{
  console.log(req)

  const { method, url} = req;

  const buff = [];

  for await (const chunck of req){
    buff.push(chunck)
  }

  console.log(buff.toString())

  if(method === 'GET' && url === '/users'){
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }

  if(method === 'POST' && url === '/users'){

    users.push({
      name: 'Titi',
      age: 29
    })

    return res.writeHead(201).end()
  }

  return res.end('Hello word!')  
});

server.listen(3333);