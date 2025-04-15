import http from 'node:http';
import {json} from './middleware/json.js'
import { routes } from './routes.js';
import path from 'node:path';


const server = http.createServer(async(req,res)=>{
  const {method,url} = req

  await json(req,res)

  const route = routes.find((route) =>{
    return route.method === method && route.path.test(url)
  })

  if(route){
    const routeParams = req.url.match(route.path)

    console.log(routeParams)

    return route.handle(req,res)
  }

  return res.writeHead(404).end('Not found')
});

server.listen(3333);
