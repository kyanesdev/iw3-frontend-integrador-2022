/* eslint-disable */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Card from "primevue/card";
import Button from "primevue/button";
import Steps from 'primevue/steps';
import { plugin, defaultConfig } from "@formkit/vue";

import "@formkit/themes/genesis";
import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons

const app = createApp(App);

app.use(router);
app.use(plugin, defaultConfig)
app.use(PrimeVue);
app.component("Card", Card);
app.component("Button",Button);
app.component("Steps", Steps);
app.mount("#app");
