<template>
  <div class="todoContainer__options">
    <button
      :class="{ active: filter == 'all' }"
      class="todoContainer__filterButton"
      @click="changedFilter('all')"
    >
      All
    </button>
    <button
      :class="{ active: filter == 'active' }"
      class="todoContainer__filterButton"
      @click="changedFilter('active')"
    >
      Active
    </button>
    <button
      :class="{ active: filter == 'completed' }"
      class="todoContainer__filterButton"
      @click="changedFilter('completed')"
    >
      Completed
    </button>
  </div>
</template>

<script>
export default {
  name: "tasks-filter",
  data() {
    return {
      filter: "all",
    };
  },
  methods: {
    changedFilter(filter) {
      this.filter = filter;
      this.eventBus.emit("filterChanged", filter);
    },
  },
};
</script>
