import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/HomePage.vue";
import TruckSave from "./views/truck/TruckSave"

const routes = [
  { path: "/", 
    name: "home", 
    component: Home 
  },
  {
    path: "/carga/camion",
    name: "TruckSave",
    component: TruckSave
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
