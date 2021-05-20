import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";
import directives from "./directives/";

const app = createApp(App);

directives(app);

app.use(store).use(router).mount("#app");
