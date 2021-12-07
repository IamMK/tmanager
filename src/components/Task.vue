<template>
  <figure>
    <header class="task__header">
      <input
        type="checkbox"
        v-model="completed"
        class="task__complete"
        @change="updateTask"
      />
      <h3
        class="task__title"
        :class="{ 'task--completed': completed }"
        v-if="!titleEditing"
        @dblclick="editTaskTitle"
      >
        {{ title }}
      </h3>
      <input
        v-else
        type="text"
        name="todoTitle"
        v-model="title"
        @blur="editTaskTitle"
        @keyup.enter="editTaskTitle"
        @keyup.esc="cancelEditTitle"
        autofocus
        v-focus
      />
      <button class="task__remove" @click="removeTask">&times;</button>
    </header>
    <figcaption class="task__description">
      <p
        :class="{ 'task--completed': completed }"
        v-if="!subjectEditing"
        @dblclick="editTaskSubject"
      >
        {{ content }}
      </p>
      <input
        v-else
        type="text"
        name="taskTitle"
        v-model="content"
        @blur="editTaskSubject"
        @keyup.enter="editTaskSubject"
        @keyup.esc="cancelEditSubject"
        v-focus
      />
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: "TheTask",
  props: {
    taskItem: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    checkAll: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      id: this.taskItem.id,
      title: this.taskItem.title,
      content: this.taskItem.content,
      completed: this.taskItem.completed,
      titleEditing: this.taskItem.titleEditing,
      subjectEditing: this.taskItem.subjectEditing,
      beforeEditTitle: "",
      beforeEditSubject: "",
    };
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.taskItem.completed;
    },
  },
  methods: {
    removeTask() {
      this.$store.dispatch("removeTask", this.id);
    },
    updateTask() {
      this.$store.dispatch("updateTask", {
        id: this.id,
        title: this.title,
        content: this.content,
        completed: this.completed,
        titleEditing: this.titleEditing,
        subjectEditing: this.subjectEditing,
      });
    },
    editTaskTitle() {
      if (this.title.trim() == "") this.title = this.beforeEditTitle;
      this.beforeEditTitle = this.title;
      this.titleEditing = !this.titleEditing;
      this.updateTask();
    },
    editTaskSubject() {
      if (this.content.trim() == "") this.content = this.beforeEditSubject;
      this.beforeEditSubject = this.content;
      this.subjectEditing = !this.subjectEditing;
      this.updateTask();
    },
    cancelEditTitle() {
      this.title = this.beforeEditTitle;
      this.titleEditing = false;
    },
    cancelEditSubject() {
      this.content = this.beforeEditSubject;
      this.subjectEditing = false;
    },
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
};
</script>

<style lang="scss">
.task--completed {
  text-decoration: line-through;
}
</style>
