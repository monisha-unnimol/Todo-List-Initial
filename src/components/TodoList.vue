<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';

import Header from './Header.vue';
import TaskItem from './TaskItem.vue';

import type { Task } from '@/types/task';
import { useTaskStore } from '@/store/tasks';
import { router } from '@/router';

const taskStore = useTaskStore();
const tasks = ref<Task[]>(taskStore.tasks);
const noOfTasks = computed(() => tasks.value.length)

const editTaskClick = (task: Task) => {
  router.push(`/edit/${task.id}`)
};

watchEffect(() => tasks.value = taskStore.tasks);

</script>

<template>
  <div class="container">
    <Header @button-click="router.push('/create')" />
    <TaskItem v-for="task in tasks" :key="task.id" :task="task" @edit="editTaskClick"
      @delete-task="taskStore.removeTask" />
  </div>
</template>

<style scoped>

</style>