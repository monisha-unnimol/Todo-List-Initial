<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';

import Header from './Header.vue';
import TaskItem from './TaskItem.vue';
import TaskForm from './TaskForm.vue';

import type { Task } from '@/types/task';
import { useTaskStore } from '@/store/tasks';

const taskStore = useTaskStore();
const tasks = ref<Task[]>(taskStore.tasks);
const noOfTasks = computed(() => tasks.value.length)

const editTaskClick = (task: Task) => {
  taskStore.editTaskDetails = task;
  taskStore.toggleForm();
}; 
watchEffect(() => {
  if (taskStore.editTaskDetails?.id && !taskStore.showForm) {
    taskStore.editTaskDetails = null;
  }
})
watchEffect(() => tasks.value = taskStore.tasks);

</script>

<template>
  <div class="container">
    <Header name="Monisha" />
    <div v-if="taskStore.showForm">
      <TaskForm
        @create-task="taskStore.addTask"
        @update-task="taskStore.updateTask"
      />
    </div>
    <div v-if="!taskStore.showForm && !noOfTasks" class="tasks-empty">
      You do not have any tasks...
    </div>
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @edit-task="editTaskClick"
      @delete-task="taskStore.removeTask"
    />
  </div>
</template>

<style scoped>
.tasks-empty {
  margin-top: 30px;
}
</style>