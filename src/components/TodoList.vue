<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';

import Header from './Header.vue';
import TaskItem from './TaskItem.vue';
import TaskForm from './TaskForm.vue';

import type { Task } from '@/types/task';
import { useTaskStore } from '@/store/tasks';
import { router } from '@/router';

const taskStore = useTaskStore();
const tasks = ref<Task[]>(taskStore.tasks);
const noOfTasks = computed(() => tasks.value.length)

const editTaskClick = (task: Task) => {
  taskStore.editTaskDetails = task;
  router.push(`/edit/${task.id}`)
  taskStore.toggleForm();
}; 

watch(noOfTasks, () => console.log('watch', noOfTasks.value))
watchEffect(() => {
  if (noOfTasks.value === 0) {
    // taskStore.showForm = true
    router.push('/create')
  }
  console.log('watchEffect', noOfTasks.value)
})
watchEffect(() => tasks.value = taskStore.tasks);

</script>

<template>
  <div class="container">
    <Header @button-click="router.push('/create')" />
    <!-- <div v-if="taskStore.showForm">
      <TaskForm
        @create-task="taskStore.addTask"
        @update-task="taskStore.updateTask"
      />
    </div> -->
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @edit="editTaskClick"
      @delete-task="taskStore.removeTask"
    />
  </div>
</template>

<style scoped>

</style>