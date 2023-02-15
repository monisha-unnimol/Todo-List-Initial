import { createRouter, createWebHistory } from "vue-router";

import TaskFormVue from "@/components/TaskForm.vue";
import TodoListVue from "@/components/TodoList.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'taskTracker',
      component: TodoListVue
    },
    {
      path: '/create',
      name: 'createTask',
      component: TaskFormVue
    },
    {
      path: '/edit/:id',
      name: 'editTask',
      component: TaskFormVue
    }
  ]
})