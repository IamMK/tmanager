<template>
  <section class="form">
    <h2 class="form__title">Login to T-Manager</h2>
    <form class="form__body" action="#" @submit.prevent="login">
      <div class="form__inputbox">
        <input
          class="form__input"
          type="email"
          name="username"
          id="userame"
          v-model="email"
          required="required"
        />
        <span class="form__inputText">Email</span>
      </div>
      <div class="form__inputbox">
        <input
          class="form__input"
          type="password"
          name="password"
          id="password"
          v-model="password"
          required="required"
        />
        <span class="form__inputText">Password</span>
      </div>
      <div class="form__inputbox">
        <button class="form__submit" type="submit" value="submit">
          Submit
        </button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("retrieveToken", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "tmanager" });
        });
    },
  },
};
</script>

<style lang="scss">
@import "./style/auth";
</style>
