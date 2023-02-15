<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';

import type { Task } from '@/types/task';

import Header from './Header.vue';
import TaskItem from './TaskItem.vue';
import TaskForm from './TaskForm.vue';

const tasks = ref<Task[]>([{
  id: '1',
  title: 'Task 1',
  date: '2023-03-18',
  reminder: false
}]);

const noOfTasks = computed(() => tasks.value.length)
const showForm = ref(false);
const editTaskDetails = ref<Task | null>();

const toggleForm = () => {
  showForm.value = !showForm.value
};

const onEditTask = (task: Task) => {
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

watchEffect(() => {
  if (editTaskDetails.value?.id && !showForm.value) {
    editTaskDetails.value = null;
  }
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
    <div v-if="!showForm && !noOfTasks" class="tasks-empty">
      You do not have any tasks...
    </div>
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @edit-task="onEditTask"
      @delete-task="onDeleteTask"
    />
  </div>
</template>

<style scoped>
.tasks-empty {
  margin-top: 30px;
}
</style>