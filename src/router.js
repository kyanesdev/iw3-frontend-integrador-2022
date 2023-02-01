import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/LoginPage.vue";
import Orden from "@/views/orden/OrdenPage.vue";
import Camion from "@/views/camion/CamionPage.vue";
import Chofer from "@/views/chofer/ChoferPage.vue";
import Cliente from "@/views/cliente/ClientePage.vue";
import Producto from "@/views/producto/ProductoPage.vue";
import Conciliacion from "@/views/conciliacion/ConciliacionPage.vue"

const routes = [
  { path: "/", 
    name: "LoginPage", 
    component: Login 
  },
  { path: "/orden", 
    name: "OrdenPage", 
    component: Orden 
  },
  { path: "/camion", 
    name: "CamionPage", 
    component: Camion 
  },
  { path: "/chofer", 
    name: "ChoferPage", 
    component: Chofer 
  },
  { path: "/cliente", 
    name: "ClientePage", 
    component: Cliente 
  },
  { path: "/producto", 
    name: "ProductoPage", 
    component: Producto 
  },
  {
    path: "/conciliacion",
    name: "ConciliacionPage",
    component: Conciliacion
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
