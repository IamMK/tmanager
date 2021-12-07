<template>
  <section class="tasks">
    <tasks-filter></tasks-filter>

    <article class="taskManagement">
      <input
        class="taskManagement__newTask"
        type="text"
        name=""
        placeholder="Type your todo"
        v-model="inputTitleContent"
        @keyup.enter="newTask"
      />
      <input
        class="taskManagement__newTask"
        type="text"
        name=""
        placeholder="Type your todo"
        v-model="inputSubjectContent"
        @keyup.enter="newTask"
      />
    </article>
    <article class="taskContainer">
      <task
        v-for="taskItem in tasksFiltered"
        :key="taskItem.id"
        class="task"
        :taskItem="taskItem"
        :checkAll="!anyRemaining"
      >
      </task>
    </article>

    <article class="task__options">
      <check-all-button></check-all-button>
      <todo-remaining></todo-remaining>
      <clear-completed></clear-completed>
    </article>
  </section>
</template>

<script>
import Task from "./Task";
import TodoRemaining from "./TheTodoItemsRemaining";
import CheckAllButton from "./TheTodoCheckAll";
import TasksFilter from "./TheTasksFiltered";
import ClearCompleted from "./TheClearTasksButton";

export default {
  name: "TheTodoList",
  components: {
    Task,
    TodoRemaining,
    CheckAllButton,
    TasksFilter,
    ClearCompleted,
  },
  data() {
    return {
      inputTitleContent: "",
      inputSubjectContent: "",
      // newTaskNo: ''
    };
  },
  created() {
    this.$store.dispatch("retrieveTasks");
  },
  computed: {
    remaining() {
      return this.$store.getters.remaining;
    },
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    },
    tasksFiltered() {
      return this.$store.getters.tasksFiltered;
    },
    showClearCompletedButton() {
      return this.$store.getters.showClearCompletedButton;
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
        this.$store.dispatch("addTask", {
          title: this.inputTitleContent,
          content: this.inputSubjectContent,
        });
        this.inputSubjectContent = this.inputTitleContent = "";
      }
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

.taskManagement {
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

.tasks {
  box-sizing: border-box;
  margin: auto;
  width: 80%;
  height: 100%;
  padding-top: 70px;
  &__options {
    width: 100%;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 950px) {
      flex-direction: column;
    }
  }
  &__filterButton {
    width: calc(100% / #{$filterButtons});
    @media screen and (max-width: 950px) {
      width: 100%;
    }
    height: 5vh;
    margin: 2px;

    background-color: #ff8c00;
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
  justify-content: space-around;
  @media screen and (max-width: 950px) {
    justify-content: center;
  }
}
.task {
  width: 300px;
  background-color: #ff8c00;
  // border-radius: 20px;
  @media screen and (max-width: 950px) {
    width: 100%;
  }
  padding: 20px;
  margin: 20px;
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
    background-color: #ff8c00;
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
