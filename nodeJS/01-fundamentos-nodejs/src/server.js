import http from 'node:http';

const users = []

const server = http.createServer((req,res)=>{
  const { method, url} = req;

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

    return res.end('Cadastro de usuário')
  }

  return res.end('Hello word!')  
});

server.listen(3333);