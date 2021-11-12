<template>
  <label>
    <input type="checkbox" :checked="!anyRemaining" @change="allChecked" />
    Check all
  </label>
</template>

<script>
export default {
  name: "check-all-button",
  props: {
    anyRemaining: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    allChecked() {
      this.eventBus.emit("allChecked", this.anyRemaining);
    },
  },
};
</script>
