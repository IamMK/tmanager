<template>
  <section class="form">
    <h2 class="form__title">Join T-Manager Now</h2>
    <form class="form__body" action="#" @submit.prevent="register">
      <div class="form__inputbox">
        <input
          class="form__input"
          type="text"
          name="username"
          id="userame"
          v-model="name"
          required="required"
        />
        <span class="form__inputText">Username</span>
      </div>
      <div class="form__inputbox">
        <input
          class="form__input"
          type="email"
          name="email"
          id="email"
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
          Register
        </button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      email: "",
      name: "",
      password: "",
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch("register", {
          email: this.email,
          name: this.name,
          team_id: 1,
          is_admin: false,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "login" });
        });
    },
  },
  computed:{
    team(){
      return this.$store.getters.teams;
    }
  }
};
</script>

<style lang="scss">
@import "./style/auth.scss";
</style>
