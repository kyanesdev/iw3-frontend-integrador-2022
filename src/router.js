import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/HomePage.vue";
import TruckSave from "./views/truck/TruckSave"
import OrderSave from "./views/order/OrderSave"


const routes = [
  { path: "/", 
    name: "home", 
    component: Home 
  },
  {
    path: "/save/truck",
    name: "TruckSave",
    component: TruckSave
  },
  {
    path:"/save/order",
    name:"OrderSave",
    component: OrderSave
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
