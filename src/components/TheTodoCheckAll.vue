<template>
  <label>
    <input type="checkbox" :checked="!anyRemaining" @change="allChecked" />
    Check all
  </label>
</template>

<script>
export default {
  name: "check-all-button",
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    },
  },
  methods: {
    allChecked() {
      this.$store.dispatch("checkAll", event.target.checked);
      // this.$store.state.tasks.forEach(
      //   (task) => (task.completed = event.target.checked)
      // );
    },
  },
};
</script>
