<template>
    <div>
        제목 : {{ title }}
    </div>
    <div>
        내용 : {{ content }}
    </div>
    
  </template>
  
  <script>
  export default {
name: 'QandADetailPate',
    data() {
        return {
            title: '',
            content: ''
        }
    }
  }
  </script>
  
  <style>
  
  </style>
  