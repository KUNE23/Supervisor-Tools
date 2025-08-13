import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import router from "./router";

const options = {
  position: "bottom-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  icon: true,
  transition: "Vue-Toastification__bounce",
};
const app = createApp(App);
app.use(router);
app.use(Toast, options);
app.mount("#app");
