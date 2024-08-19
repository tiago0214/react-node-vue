import { DataBase } from "./database.js"
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new DataBase();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) =>{
      const { search } = req.query

      const users = database.select('users',search ? {
        name: search,
      } : null);

      return res.end(JSON.stringify(users));
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) =>{
      const { name, age } = req.body

      const user = {
        id: randomUUID(),
        name,
        age
      }

      database.insert('users', user);

      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req,res) =>{
      const { id } = req.params
      const { name, age } = req.body

      database.update('users',id, { name, age })
      res.writeHead(204).end();
    }
  }
  ,
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req,res) =>{
      const { id } = req.params

      database.delete('users',id)
      res.writeHead(204).end();
    }
  }
]