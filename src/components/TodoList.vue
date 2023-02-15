<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';

import Header from './Header.vue';
import TaskItem from './TaskItem.vue';
import TaskForm from './TaskForm.vue';

import type { Task } from '@/types/task';

const tasks = ref<Task[]>([{
  id: '1',
  title: 'Task 1',
  date: '2023-03-18',
  reminder: false
}]);

const noOfTasks = computed(() => tasks.value.length)
const showForm = ref(false);
const editTaskDetails = ref<Task>();

const toggleForm = () => {
  showForm.value = !showForm.value
  if (editTaskDetails.value?.id && !showForm.value) {
    editTaskDetails.value = undefined;
  }
};

const editTaskClick = (task: Task) => {
  editTaskDetails.value = task;
  toggleForm();
}; 

const onCreateTask = (newTask:  Task) => {
  tasks.value = [...tasks.value, newTask]
  toggleForm();
};

const onUpdateTask = (newTask: Task) => {
  const index = tasks.value.findIndex((task) => task.id === newTask.id);
  tasks.value[index] = newTask;
  toggleForm();
};

const onDeleteTask = (id: string) => {
  tasks.value = tasks.value.filter((task) => task.id !== id)
};

watchEffect(() => console.log('watchEffect', noOfTasks.value))
watch(noOfTasks, () => {
  if (noOfTasks.value === 0) {
    showForm.value = true
  }
  console.log('watch', noOfTasks.value)
})

</script>

<template>
  <div class="container">
    <Header name="Monisha" :showForm="showForm" :toggleForm="toggleForm" />
    <div v-if="showForm">
      <TaskForm
        @create-task="onCreateTask"
        @update-task="onUpdateTask"
        :editTaskDetails="editTaskDetails"
      />
    </div>
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @edit="editTaskClick"
      @delete-task="onDeleteTask"
    />
  </div>
</template>

<style scoped>

</style>