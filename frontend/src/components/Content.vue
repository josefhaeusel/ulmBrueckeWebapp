<template>
    <div style="margin-top:1000px">

    </div>
  </template>
  
  <script>
  export default {
    name: 'ContentMiddle',
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
  