<template>
  <button
    class="task__clearBtn"
    v-if="showClearCompletedButton"
    @click="clearCompleted"
  >
    Clear Completed
  </button>
</template>

<script>
export default {
  name: "clear-tasks-button",
  computed: {
    showClearCompletedButton() {
      return this.$store.getters.showClearCompletedButton;
    },
  },
  methods: {
    clearCompleted() {
      this.$store.dispatch("clearCompleted", this.$store.state.tasks);
      // this.$store.state.tasks = this.$store.state.tasks.filter(
      //   (task) => !task.completed
      // );
    },
  },
};
</script>
