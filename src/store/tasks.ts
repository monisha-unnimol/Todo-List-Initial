import type { Task } from '@/types/task';
import { defineStore } from 'pinia';

export const useTaskStore = defineStore('tasks', {
  state: () => {
    return {
      tasks: [{ id : '1', title: 'Task 1',  date: '2023-03-18', reminder: false }] as Task[],
      showForm: false,
      editTaskDetails: {} as Task | null
    }
  },
  getters: {
    
  },
  actions: {
    toggleForm() {
      this.showForm = !this.showForm
      if (this.editTaskDetails?.id && !this.showForm) {
        this.editTaskDetails = null
      }
    },
    addTask(task: Task) {
      this.tasks = [...this.tasks, task]
      this.toggleForm()
    },
    removeTask(id: string) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
    },
    updateTask(newTask: Task) {
      this.toggleForm()
      const index = this.tasks.findIndex((task) => task.id === newTask.id);
      this.tasks[index] = newTask;
    }
  }
})