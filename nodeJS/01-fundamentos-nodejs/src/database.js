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

  select(table){
    const data = this.#database[table] ?? []

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
}