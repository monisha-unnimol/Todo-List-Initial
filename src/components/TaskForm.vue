
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { router } from '@/router';
import { useRoute } from 'vue-router';

import Header from './Header.vue';
import { useTaskStore } from '@/store/tasks';

const name = ref('');
const date = ref('');
const reminder = ref(false);
const taskId = ref<string>(useRoute().params.id?.toString());
const isEditFlow = computed(() => Boolean(taskId.value));

const { addTask, updateTask, getTaskById } = useTaskStore();

onMounted(() => {
  if (isEditFlow.value) {
    const task = getTaskById(taskId.value);
    name.value = task?.title || '';
    date.value = task?.date || '';
    reminder.value = task?.reminder || false;
  }
})

const onCreateSubmit = (e: MouseEvent) => {
  e.preventDefault();
  const newTask = {
    id: Math.random().toString(36).substr(2, 10),
    title: name.value,
    date: date.value,
    reminder: reminder.value
  }
  addTask(newTask);
  router.back()
}

const onEditSubmit = (e: MouseEvent) => {
  e.preventDefault();
  const updatedTask = {
    id: taskId.value || '',
    title: name.value,
    date: date.value,
    reminder: reminder.value
  };
  updateTask(updatedTask);
  router.back()
}

const onCancel = () => {
  router.back()
};
</script>

<template>
  <div class="add-form container">
    <Header :title="isEditFlow ? 'Edit task' : 'Create Task'" button-label="Cancel" @button-click="onCancel" />
    <form @="{ submit: isEditFlow ? onEditSubmit : onCreateSubmit }">
      <div class="form-control">
        <label for="name">
          Task Name
        </label>
        <input type="text" id="name" placeholder="Enter task name" v-model="name" required />
      </div>
      <div class="form-control">
        <label for="date">
          Date
        </label>
        <input type="date" id="date" placeholder="Enter task date" v-model="date" required />
      </div>
      <div class="form-control form-control-check">
        <label for="reminder">Set Reminder?</label>
        <input type="checkbox" id="reminder" v-model="reminder" />
      </div>
      <button class="button button-block" type="submit">{{ isEditFlow? 'Save Task': 'Create Task' }}</button>
    </form>
  </div>
</template>

<style scoped>
.add-form {
  margin-bottom: 40px;
}

.form-control {
  margin: 20px 0;
}

.form-control label {
  display: block;
}

.form-control input {
  width: 100%;
  height: 40px;
  padding: 3px 7px;
  font-size: 17px;
}

.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-control-check input {
  height: 20px;
  width: 20px;
}

.close-icon {
  display: flex;
  justify-content: flex-end;
  font-size: x-large;
}
</style>