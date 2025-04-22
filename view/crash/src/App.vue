<script setup>
  import { ref } from 'vue'

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
    <li v-for="task in tasks" :key="task">{{ task }}</li>
  </ul>

  <!-- <button v-on:click="toggleStatus">Change user</button> -->
  <button @click="toggleStatus">Change user</button>
</template>
