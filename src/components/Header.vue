<script setup lang="ts">
import { router } from '@/router';
import { useTaskStore } from '@/store/tasks';


withDefaults(defineProps<{
  title?: string,
  buttonLabel?: string
}>(), {
  title: 'Hello, Vinay',
  buttonLabel: 'Add Task'
})

// defineProps({
//   name: {
//     type: String,
//     default: 'Vinay'
//   }
// })

defineEmits(['button-click'])

</script>

<template>
  <header>
    <h1>
      {{ title }}
    </h1>
    <button class="button" @click.stop="$emit('button-click')">{{ buttonLabel }}</button>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>