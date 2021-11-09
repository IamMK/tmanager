<template>
  <section class="todoContainer">
    <div class="todoContainer__options">
      <button
        :class="{ active: filter == 'all' }"
        class="todoContainer__filterButton"
        @click="filter = 'all'"
      >
        All
      </button>
      <button
        :class="{ active: filter == 'active' }"
        class="todoContainer__filterButton"
        @click="filter = 'active'"
      >
        Active
      </button>
      <button
        :class="{ active: filter == 'completed' }"
        class="todoContainer__filterButton"
        @click="filter = 'completed'"
      >
        Completed
      </button>
    </div>

    <article class="todoManagement">
      <input
        class="todoManagement__newTask"
        type="text"
        name=""
        placeholder="Type your todo"
        v-model="inputTitleContent"
        @keyup.enter="newTask"
      />
      <input
        class="todoManagement__newTask"
        type="text"
        name=""
        placeholder="Type your todo"
        v-model="inputSubjectContent"
        @keyup.enter="newTask"
      />
    </article>
    <article class="taskContainer">
      <the-task
        v-for="(taskItem, index) in tasksFiltered"
        :key="taskItem.id"
        class="task"
        :taskItem="taskItem"
        :index="index"
        :checkAllTasks="!anyRemaining"
        @deleteClick="removeTask"
        @emitedTask="editTaskTitle"
      >
      </the-task>
    </article>

    <article class="task__options">
      <label>
        <input
          type="checkbox"
          :checked="!anyRemaining"
          @change="checkAllTasks"
        />
        Check all
      </label>
      <p>{{ remaining }} items left</p>
      <button
        class="task__clearBtn"
        v-if="showClearCompletedButton"
        @click="clearCompleted"
      >
        Clear Completed
      </button>
    </article>
  </section>
</template>

<script>
import TheTask from "./TheTask";

export default {
  name: "TheTodoList",
  components: {
    TheTask,
  },
  data() {
    return {
      inputTitleContent: "",
      inputSubjectContent: "",
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
    };
  },
  computed: {
    remaining() {
      return this.tasks.filter((task) => !task.completed).length;
    },
    anyRemaining() {
      return this.remaining != 0;
    },
    tasksFiltered() {
      if (this.filter == "all") {
        return this.tasks;
      } else if (this.filter == "active") {
        return this.tasks.filter((task) => !task.completed);
      } else if (this.filter == "completed") {
        return this.tasks.filter((task) => task.completed);
      }
      return this.tasks;
    },
    showClearCompletedButton() {
      return this.tasks.filter((todo) => todo.completed).length > 0;
    },
  },
  methods: {
    newTask() {
      if (
        this.inputSubjectContent.trim().length == 0 ||
        this.inputTitleContent.trim().length == 0
      ) {
        let alertText = "";
        if (this.inputSubjectContent.trim().length == 0)
          alertText += "Type description for your task\n";

        if (this.inputTitleContent.trim().length == 0)
          alertText += "Type title for your task";

        alert(alertText);
      } else {
        this.tasks.push({
          id: this.tasks.length,
          title: this.inputTitleContent,
          content: this.inputSubjectContent,
          completed: false,
          titleEditing: false,
          subjectEditing: false,
        });
        this.inputSubjectContent = this.inputTitleContent = "";
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
    editTaskTitle(data) {
      this.tasks.splice(data.index, 1, data.task);
    },
    checkAllTasks() {
      this.tasks.forEach((task) => (task.completed = event.target.checked));
    },
    clearCompleted() {
      this.tasks = this.tasks.filter((task) => !task.completed);
    },
  },
};
</script>

<style lang="scss">
$filterButtons: 3;
body {
  background-color: #5f5f5f;
  color: #000;
}

.todoManagement {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  &__newTask {
    width: 100%;
    height: 5vh;
    margin: 5px;
    &:focus {
      outline: 0;
      border-color: #f2ca52;
    }
  }
}

.todoContainer {
  margin: auto;
  width: 80%;
  height: 100%;
  &__options {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  &__filterButton {
    width: calc(100% / #{$filterButtons});
    height: 5vh;
    margin: 2px;

    background-color: #d9ba5f;
    border-radius: 8px;
    border-style: none;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    padding: 0 1.6rem;
    text-align: center;
    text-shadow: rgba(0, 0, 0, 0.25) 0 3px 8px;
    transition: all 0.5s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

    &:hover {
      box-shadow: rgba(80, 63, 205, 0.5) 0 1px 30px;
      transition-duration: 0.1s;
    }
  }
}
.taskContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (max-width: 950px) {
    justify-content: center;
  }
}
.task {
  width: 300px;
  background-color: #bfa36f;
  border-radius: 20px;
  @media screen and (max-width: 950px) {
    width: 100%;
  }
  padding: 20px;
  margin: 20px;
  &__container {
    width: 100%;
  }
  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;

    h3 {
      font-size: 25px;
      margin: 10px;
    }
  }
  &__title {
    align-self: center;
  }
  &__complete {
    &:checked {
      background-color: #f2d852;
    }
  }
  &__remove {
    border-color: transparent;
    background-color: transparent;
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
  &__clearBtn {
    background-color: #d9ba5f;
    margin: 2px;
    border-color: transparent;
    padding: 10px;
    font-size: 15px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background-color: #f2ca52;
    }
  }
}
</style>
