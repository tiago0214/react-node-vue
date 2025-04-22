<script setup>
  import { onMounted, ref } from 'vue'

  const name = ref('Tiago Souza Dias')
  const status = ref('active')
  const tasks = ref(['Task 1', 'Task 2', 'Task 3'])
  const newTask = ref('')

  const toggleStatus = () =>{
    if(status.value === 'active'){
      status.value = 'pending'
    }else if(status.value === 'pending'){
      status.value = 'inactive'
    }else{
      status.value = 'active'
    }
  }

  const addTask = () =>{
    if(newTask.value.trim() != ''){
      tasks.value.push(newTask.value)

      newTask.value = ''
    }
  }

  const removeTask = (index) =>{
    tasks.value.splice(index,1)
  }

  onMounted(async() =>{
    try{
      const response = await fetch('https://jsonplaceholder.typicode.com/todos')
      const data = await response.json()

      tasks.value = data.map(value => value.title)
    }catch(err){
      console.log('Error fetching tasks')
    }
  })
 
</script>

<template>
  <h1>{{ name }}</h1>
  <p v-if="status === 'active'">Is activate</p>
  <p v-else-if="status === 'pending'">Is Pending</p>
  <p v-else>Is inactive</p>

  <form @submit.prevent="addTask">
    <label for="newTask">Add new task</label>
    <input type="text" id="newTask" v-model="newTask">

    <button type="submit">Submit</button>
  </form>

  <h3>Tasks:</h3>
  <ul>
    <li v-for="(task,index) in tasks" :key="task">
      <span>{{ task }}</span>
      <button @click="removeTask(index)">X</button>
    </li>
  </ul>

  <!-- <button v-on:click="toggleStatus">Change user</button> -->
  <button @click="toggleStatus">Change Status</button>
</template>
