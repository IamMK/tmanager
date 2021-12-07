<template>
  <div class="tasks__options">
    <button
      :class="{ active: filter == 'all' }"
      class="tasks__filterButton"
      @click="changeFilter('all')"
    >
      All
    </button>
    <button
      :class="{ active: filter == 'active' }"
      class="tasks__filterButton"
      @click="changeFilter('active')"
    >
      Active
    </button>
    <button
      :class="{ active: filter == 'completed' }"
      class="tasks__filterButton"
      @click="changeFilter('completed')"
    >
      Completed
    </button>
  </div>
</template>

<script>
export default {
  name: "tasks-filter",
  computed: {
    filter() {
      return this.$store.state.filter;
    },
  },
  methods: {
    changeFilter(filter) {
      this.$store.commit("updateFilter", filter);
      // this.$store.state.filter = filter;
    },
  },
};
</script>
