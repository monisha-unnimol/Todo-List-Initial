import type { Task } from "@/types/task";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTaskStore = defineStore(
  "tasks",
  /** Options API format */
  /* {
  state: () => {
    return {
      tasks: [
        { id: "1", title: "Task 1", date: "2023-03-18", reminder: false },
      ] as Task[],
      showForm: false,
      editTaskDetails: {} as Task | null,
    };
  },
  getters: {
    reminders(): Task[] {
      return this.tasks.filter((task) => task.reminder);
    },
  },
  actions: {
    toggleForm() {
      this.showForm = !this.showForm;
    },
    addTask(task: Task) {
      this.tasks = [...this.tasks, task];
      this.toggleForm();
    },
    removeTask(id: string) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    updateTask(newTask: Task) {
      this.toggleForm();
      const index = this.tasks.findIndex((task) => task.id === newTask.id);
      this.tasks[index] = newTask;
    }, 
  }
  });,*/

  () => {
    const tasks = ref<Task[]>([
      { id: "1", title: "Task 1", date: "2023-03-18", reminder: false },
    ]);
    const showForm = ref(false);
    const editTaskDetails = ref<Task | null>();

    const reminders = computed(() =>
      tasks.value.filter((task) => task.reminder)
    );

    const toggleForm = () => {
      showForm.value = !showForm.value;
    };
    const addTask = (task: Task) => {
      tasks.value = [...tasks.value, task];
      toggleForm();
    };
    const removeTask = (id: string) => {
      tasks.value = tasks.value.filter((task) => task.id !== id);
    };
    const updateTask = (newTask: Task) => {
      toggleForm();
      const index = tasks.value.findIndex((task) => task.id === newTask.id);
      tasks.value[index] = newTask;
    };
    return {
      tasks,
      showForm,
      editTaskDetails,
      reminders,
      toggleForm,
      addTask,
      removeTask,
      updateTask,
    };
  }
);
