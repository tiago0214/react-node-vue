<script>
  export default{
    data (){
      return {
        name: 'Tiago Souza Dias',
        status: 'active',
        tasks: ['task 1','task 2', 'task 3'],
        google: 'https://google.com'
      }
    },
    methods:{
      toggleStatus(){
        if(this.status === 'active'){
          this.status = 'pending'
        }else if(this.status === 'pending'){
          this.status = 'inactive'
        }else{
          this.status = 'active'
        }
      }
    }
  }
</script>

<template>
  <h1>{{ name }}</h1>
  <p v-if="status === 'active'">Is activate</p>
  <p v-else-if="status === 'pending'">Is Pending</p>
  <p v-else>Is inactive</p>

  <ul>
    <li v-for="task in tasks" :key="task">{{ task }}</li>
  </ul>

  <!-- <a v-bind:href="google">Google</a> -->
  <a :href="google">Google</a>

  <!-- <button v-on:click="toggleStatus">Change user</button> -->
  <button @click="toggleStatus">Change user</button>
</template>
