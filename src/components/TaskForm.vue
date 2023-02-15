
<script setup lang="ts">
import { onMounted, ref } from 'vue';

import type { Task } from '@/types/task';

const name = ref('');
const date = ref('');
const reminder = ref(false);

const props = defineProps<{
  editTaskDetails?: Task | null
}>()

const emit = defineEmits(['create-task', 'update-task'])
const isEditFlow = ref(Boolean(props.editTaskDetails?.id))

onMounted(() => {
  if (isEditFlow.value) {
      name.value = props.editTaskDetails?.title || '';
      date.value = props.editTaskDetails?.date || '';
      reminder.value = props.editTaskDetails?.reminder || false;
    }
  }
)

const onCreateSubmit = (e: MouseEvent) => {
  e.preventDefault();
  const newTask = {
    id: Math.random().toString(36).substr(2, 10),
    title: name.value,
    date: date.value,
    reminder: reminder.value
  }
  emit('create-task', newTask);
}

const onEditSubmit = (e: MouseEvent) => {
  e.preventDefault();
  const updatedTask = {
    id: props.editTaskDetails?.id,
    title: name.value,
    date: date.value,
    reminder: reminder.value
  };
  emit('update-task', updatedTask)
}
</script>

<template>
  <form class="add-form" @="{ submit: isEditFlow ? onEditSubmit : onCreateSubmit }">
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
    <button class="button button-block" type="submit">{{ isEditFlow ? 'Save Task': 'Create Task' }}</button>
  </form>
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