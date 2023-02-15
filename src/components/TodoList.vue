<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';

import { router } from '@/router';
import Header from "./Header.vue";
import TaskItem from "./TaskItem.vue";

import type { Task } from "@/types/task";
import { useTaskStore } from "@/store/tasks";

const taskStore = useTaskStore();
const tasks = ref<Task[]>(taskStore.tasks);
const noOfTasks = computed(() => tasks.value.length);
const showOnlyReminders = ref(false);

const editTaskClick = (task: Task) => {
  router.push(`/edit/${task.id}`)
};

watchEffect(() => tasks.value = taskStore.tasks);

</script>

<template>
  <div class="container">
    <Header name="Monisha" @button-click="router.push('/create')" />
    <div class="filter">
      <input type="checkbox" id="checkbox" v-model="showOnlyReminders" />
      <label for="checkbox">Show only reminders</label>
    </div>
    <div v-if="!noOfTasks" class="tasks-empty">
      You do not have any tasks...
    </div>
    <div v-if="showOnlyReminders">
      <TaskItem
        v-for="task in taskStore.reminders"
        :key="task.id"
        :task="task"
        @edit-task="editTaskClick"
        @delete-task="taskStore.removeTask"
      />
    </div>
    <div v-else>
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit-task="editTaskClick"
        @delete-task="taskStore.removeTask"
      />
    </div>
  </div>
</template>

<style scoped>
.tasks-empty {
  margin-top: 30px;
}
.filter {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
  margin-bottom: 10px;
}
label {
  margin-left: 5px;
}
</style>
