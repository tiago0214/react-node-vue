import { Database } from './database/database.js';
import {randomUUID} from 'node:crypto'

const dataBase = new Database()

export const routes = [{
  method: 'GET',
  path: '/users',
  handle: (req,res) => {
    const users = dataBase.select("users")

    return res.end(JSON.stringify(users))
  }
  },{
    method: 'POST',
    path: '/users',
    handle: (req,res) => {
      const { email, name } = req.body

      const user = {
        id: randomUUID(),
        name,
        email,
      }

      dataBase.insert('users',user)

      return res.writeHead(201).end()
    }
  }
]