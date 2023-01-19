/* eslint-disable */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Card from "primevue/card";
import Button from "primevue/button";
import Steps from 'primevue/steps';
import { plugin, defaultConfig } from "@formkit/vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row';  
import Toolbar from 'primevue/toolbar';                     //optional for row

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
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row",Row);
app.component("Toolbar",Toolbar);
app.mount("#app");
