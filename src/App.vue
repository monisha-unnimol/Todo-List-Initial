<script setup lang="ts">
import TodoList from './components/TodoList.vue'

</script>

<template>
  <TodoList />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Itim:wght@300;400&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Itim', 'sans-serif';
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.container {
  width: 500px;
  margin: 30px;
  overflow: auto;
  border: 1px solid;
  padding: 30px;
  border-radius: 5px;
}

.button {
  display: inline-block;
  background: black;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.button:focus {
  outline: none;
}

.button:active {
  transform: scale(0.98);
}

.button-block {
  display: block;
  width: 100%
}
</style>
