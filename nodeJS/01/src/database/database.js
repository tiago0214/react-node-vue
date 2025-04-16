import { readFile, writeFile } from 'fs/promises'

const path = new URL('../db.json',import.meta.url)

export class Database {
  #database = {}

  constructor(){
    readFile(path,'utf-8').then(data =>{
      this.#database = JSON.parse(data)
    }).catch(() =>{
      this.#persist()
    })
  }

  #persist(){
    writeFile(path, JSON.stringify(this.#database))
  }

  select(table, search){
    let data = this.#database[table] ?? []

    if(search){
      data = data.filter(row =>{
        return Object.entries(search).some(([key,value]) =>{
          return row[key].includes(value)
        })
      }) 
    }

    return data
  }

  insert(table,data){
    if(Array.isArray(this.#database[table])){
      this.#database[table].push(data)
    }else{
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  update(table,id,data){
    const indexOfUser = this.#database[table].findIndex(user => user.id === id)

    if(indexOfUser > -1){
      this.#database[table][indexOfUser] = {id, ...data}

      this.#persist()
    }
  }

  delete( table, id){
    const indexOfUser = this.#database[table].findIndex(user => user.id === id)

    if(indexOfUser > -1){
      this.#database[table].splice(indexOfUser,1)

      this.#persist()
    }
  }
}