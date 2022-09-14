import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import mitt from "mitt"

const app = createApp(App).use(router)

app.config.globalProperties.$bus = new mitt()
app.mount("#app")
