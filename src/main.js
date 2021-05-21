import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";
import directives from "./directives/";
import dayjs from "dayjs";

const app = createApp(App);

directives(app);

app.config.globalProperties.$dayjs = dayjs;

app.use(store).use(router).mount("#app");
