import { createStore } from "vuex";

export default createStore({
  state: {
    filter: "all",
    tasks: [
      {
        id: 0,
        title: "Start the App",
        content:
          "If I want to pass my final exam and take engineer title I have to do that",
        completed: true,
        titleEditing: false,
        subjectEditing: false,
      },
      {
        id: 1,
        title: "Pass final exam",
        content: "Target",
        completed: false,
        titleEditing: false,
        subjectEditing: false,
      },
      {
        id: 2,
        title: "Add functions for team",
        content: `Todo - done,
        Style - done,
        Functions for team - not yet`,
        completed: false,
        titleEditing: false,
        subjectEditing: false,
      },
    ],
  },
  getters: {
    remaining(state) {
      return state.tasks.filter((task) => !task.completed).length;
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0;
    },
    tasksFiltered(state) {
      if (state.filter == "all") {
        return state.tasks;
      } else if (state.filter == "active") {
        return state.tasks.filter((task) => !task.completed);
      } else if (state.filter == "completed") {
        return state.tasks.filter((task) => task.completed);
      }
      return state.tasks;
    },
    showClearCompletedButton(state) {
      return state.tasks.filter((todo) => todo.completed).length > 0;
    },
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push({
        id: state.tasks.length,
        title: task.title,
        content: task.content,
        completed: false,
        titleEditing: false,
        subjectEditing: false,
      });
    },
    clearCompleted(state) {
      state.tasks = state.tasks.filter((task) => !task.completed);
    },
    updateFilter(state, filter) {
      state.filter = filter;
    },
    checkAll(state, check) {
      state.tasks.forEach((task) => (task.completed = check));
    },
    removeTask(state, id) {
      const index = state.tasks.findIndex((item) => item.id == id);
      state.tasks.splice(index, 1);
    },
    updateTask(state, task) {
      const index = state.tasks.findIndex((item) => item.id == task.id);
      state.tasks.splice(index, 1, {
        id: task.id,
        title: task.title,
        content: task.content,
        completed: task.completed,
        titleEditing: task.titleEditing,
        subjectEditing: task.subjectEditing,
      });
    },
  },
  actions: {},
  modules: {},
});
