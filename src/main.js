import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import mitt from "mitt";

const eventBus = mitt();
const app = createApp(App);

app.config.globalProperties.eventBus = eventBus;
app.use(store).mount("#app");
