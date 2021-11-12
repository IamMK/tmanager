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
  props: {
    showClearCompletedButton: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    clearCompleted() {
      this.eventBus.emit("clearButtonClicked");
    },
  },
};
</script>
