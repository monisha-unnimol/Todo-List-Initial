import type { Task } from '@/types/task';
import { defineStore } from 'pinia';

export const useTaskStore = defineStore('tasks', {
  state: () => {
    return {
      tasks: [{ id: '1', title: 'Task 1', date: '2023-03-18', reminder: false }] as Task[]
    }
  },
  getters: {
    getTaskById() {
      return (id: string) => this.tasks.find((task) => task.id === id)
    }
  },
  actions: {
    addTask(task: Task) {
      this.tasks = [...this.tasks, task]
    },
    removeTask(id: string) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
    },
    updateTask(newTask: Task) {
      const index = this.tasks.findIndex((task) => task.id === newTask.id);
      this.tasks[index] = newTask;
    }
  }
})