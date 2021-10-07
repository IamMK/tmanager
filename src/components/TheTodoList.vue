<template>
  <div>
    <input
      class="todo__input"
      type="text"
      name=""
      placeholder="Type your todo"
      v-model="inputTitleContent"
      @keyup.enter="newTask"
    />
    <input
      class="todo__input"
      type="text"
      name=""
      placeholder="Type your todo"
      v-model="inputSubjectContent"
      @keyup.enter="newTask"
    />
    <div v-for="(task, index) in tasks" :key="task.id" class="todo__items">
      <div class="todo__item">
        <div class="todo__title">
          <div v-if="!task.titleEditing" @dblclick="editTaskTitle(task)">
            {{ task.title }}
          </div>
          <input
            v-else
            type="text"
            name="todoTitle"
            v-model="task.title"
            @blur="editTaskTitle(task)"
            @keyup.enter="editTaskTitle(task)"
            @keyup.esc="cancelEditTitle(task)"
            v-focus
          />
        </div>
        <div class="todo__description">
          <div v-if="!task.subjectEditing" @dblclick="editTaskSubject(task)">
            {{ task.content }}
          </div>
          <input
            v-else
            type="text"
            name="todoTitle"
            v-model="task.content"
            @blur="editTaskSubject(task)"
            @keyup.enter="editTaskSubject(task)"
            @keyup.esc="cancelEditSubject(task)"
            v-focus
          />
        </div>
        <div class="todo__remove" @click="removeTask(index)">&times;</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheTodoList",
  data() {
    return {
      inputTitleContent: "",
      inputSubjectContent: "",
      tasks: [
        {
          id: 0,
          title: "Start the App",
          content:
            "If I want to pass my final exam and take engineer title I have to do that",
          completed: false,
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
      ],
    };
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
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
    editTaskTitle(task) {
      this.beforeEditTitle = task.title;
      task.titleEditing = !task.titleEditing;
    },
    editTaskSubject(task) {
      this.beforeEditSubject = task.content;
      task.subjectEditing = !task.subjectEditing;
    },
    cancelEditTitle(task) {
      task.title = this.beforeEditTitle;
      task.titleEditing = false;
    },
    cancelEditSubject(task) {
      task.content = this.beforeEditSubject;
      task.subjectEditing = false;
    },
  },
};
</script>

<style scoped lang="scss">
.todo {
  &__input {
    width: 100%;
    padding: 10px 10px;
    font-size: 18px;
    margin-bottom: 16px;
    &:focus {
      outline: 0;
    }
  }
}
</style>
