<template>
    <div>
      <audio controls>
        <source src="/stream"/>
      </audio>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AudioStream',
    data() {
      return {
        message: 'Hello from MyComponent!'
      }
    },
    methods: {
      showAlert() {
        alert(this.message);
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  