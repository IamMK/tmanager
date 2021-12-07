import { createStore } from "vuex";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";

export default createStore({
  state: {
    token: localStorage.getItem("access_token") || null,
    filter: "all",
    tasks: [],
    menuVisibile: false,
  },
  getters: {
    menuVisibility(state) {
      return state.menuVisibile;
    },
    loggedIn(state) {
      return state.token != null;
    },
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
    changeMenuVisibility(state) {
      state.menuVisibile = !state.menuVisibile;
    },
    destroyToken(state) {
      state.token = null;
    },
    addTask(state, task) {
      state.tasks.push({
        id: task.id,
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
    retrieveTasks(state, data) {
      data.map((data) =>
        data.completed == 1 ? (data.completed = true) : (data.completed = false)
      );
      state.tasks = data;
    },
    retrieveToken(state, token) {
      state.token = token;
    },
    clearTasks(state) {
      state.tasks = [];
    },
  },
  actions: {
    changeMenuVisibility(context) {
      context.commit("changeMenuVisibility");
    },
    clearTasks(context) {
      context.commit("clearTasks");
    },
    destroyToken(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios
            .post("/logout")
            .then((response) => {
              localStorage.removeItem("access_token");
              context.commit("destroyToken");
              resolve(response);
            })
            .catch((error) => {
              localStorage.removeItem("access_token");
              context.commit("destroyToken");
              reject(error);
            });
        });
      }
    },
    clearCompleted(context, tasks) {
      console.log(tasks);
      const completed = tasks
        .filter((task) => task.completed)
        .map((task) => task.id);

      axios
        .delete("/tasksDeleteCompleted/", {
          data: {
            tasks: completed,
          },
        })
        .then(() => context.commit("clearCompleted"))
        .catch((error) => console.log(error));
    },
    checkAll(context, checked) {
      axios
        .patch("/tasksCheckAll/", {
          completed: checked,
        })
        .then(() => context.commit("checkAll", checked))
        .catch((error) => console.log(error));
    },
    removeTask(context, id) {
      axios
        .delete("/tasks/" + id)
        .then(() => context.commit("removeTask", id))
        .catch((error) => console.log(error));
    },
    updateTask(context, task) {
      axios
        .patch("/tasks/" + task.id, {
          title: task.title,
          content: task.content,
          completed: task.completed,
        })
        .then((response) => context.commit("updateTask", response.data))
        .catch((error) => console.log(error));
    },
    addTask(context, task) {
      axios
        .post("/tasks", {
          title: task.title,
          content: task.content,
          team_id: 1,
          completed: false,
        })
        .then((response) => context.commit("addTask", response.data))
        .catch((error) => console.log(error));
    },
    retrieveTasks(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;

      axios
        .get("/tasks")
        .then((response) => context.commit("retrieveTasks", response.data))
        .catch((error) => console.log(error));
    },
    retrieveToken(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/login", {
            username: data.email,
            password: data.password,
          })
          .then((response) => {
            const token = response.data.access_token;
            localStorage.setItem("access_token", token);
            context.commit("retrieveToken", token);
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/register", {
            name: data.name,
            email: data.email,
            is_admin: 0,
            team_id: 1,
            password: data.password,
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  modules: {},
});
