<script>
export default {
  created() {
    this.$store.dispatch("clearTasks");
    this.$store.dispatch("destroyToken").then(() => {
      this.$router.push({ name: "main" });
    });
  },
};
</script>
