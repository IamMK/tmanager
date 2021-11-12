<template>
  <p>{{ remaining }} items left</p>
</template>

<script>
export default {
  name: "todo-remaining",
  props: {
    remaining: {
      type: Number,
      required: true,
    },
  },
};
</script>
