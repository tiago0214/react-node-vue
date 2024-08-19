import fs from 'node:fs/promises';
//I have to use this everytime => to avoid -> if I change the node execution process's current working directory
//it doesn't impact how my application should save the database.
const databasePath = new URL('../db.json', import.meta.url);

export class DataBase {
  #database = {}

  constructor(){
    fs.readFile(databasePath, 'utf-8')
      .then(data => {
        this.#database = JSON.parse(data);
      })
      .catch(()=>{
        this.#persist();
      })
  }

  #persist(){
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, search){
    let data = this.#database[table] ?? []

    if(search){
      data = data.filter(data => {
        return Object.entries(search).some(([key,value]) => {
          return data[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }

    return data
  }

  insert(table, data){
    if(Array.isArray(this.#database[table])){
      this.#database[table].push(data);
    }else{
      this.#database[table] = [data];
    }

    this.#persist();

    return data
  }

  update(table, id, data){
    const index = this.#database[table].findIndex(data => data.id === id);

    if(index > -1){
      this.#database[table][index] = {id, ...data}
      this.#persist();
    }
  }

  delete(table, id){
    const index = this.#database[table].findIndex(row => row.id === id);

    if(index > -1){
      this.#database[table].splice(index,1);
      this.#persist();
    }
  }
}