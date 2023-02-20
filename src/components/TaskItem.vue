<script setup lang="ts">
import type { Task } from '../types/task';

defineProps<{
  task: Task
}>();

defineEmits(['delete-task', 'edit-task']);

</script>

<template>
  <div :class="[task.reminder ? 'reminder' : '', 'task']" @click.stop="$emit('edit-task', task)">
    <div class="task-container">
      <div class="details">
        <h4>{{ task.title }}</h4>
        <h5>{{ task.date }}</h5>
      </div>
      <div class="icons" @click.stop="$emit('delete-task', task.id)">
        <i class="fas fa-trash-can"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task {
  background: gainsboro;
  margin: 5px;
  margin-top: 10px;
  padding: 10px 20px;
  cursor: pointer;
}

.task.reminder {
  border-left: 5px solid green;
}

.task-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.icons {
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>