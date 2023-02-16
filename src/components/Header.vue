<script setup lang="ts">
import { useTaskStore } from '@/store/tasks';


withDefaults(defineProps<{
  name: string,
}>(), {
  name: 'Vinay',
})

// defineProps({
//   name: {
//     type: String,
//     default: 'Vinay'
//   }
// })

const taskStore = useTaskStore();

</script>

<template>
  <header>
    <h1>
      Hello, {{ name }}
    </h1>
    <button class="button" @click.stop="taskStore.toggleForm">{{ taskStore.showForm ? 'Close' : 'Add Task' }}</button>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>