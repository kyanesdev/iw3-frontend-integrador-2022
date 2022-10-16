<template>
  <div class="menu">
    <MenuCard cardName="Carga Camion" buttonText="BOTON" path="/camion" />
    <MenuCard cardName="Carga Cliente" buttonText="BOTON" />
    <MenuCard cardName="Carga Orden" buttonText="BOTON" />
    <MenuCard cardName="Carga Chofer" buttonText="BOTON" />
    <MenuCard cardName="Carga Producto" buttonText="BOTON" />
  </div>
</template>

<script>
import MenuCard from "../components/MenuCard.vue";

export default {
  name: "HomePage",
  components: {
    MenuCard,
  },
};
</script>

<style scoped>
.menu {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: auto;
  justify-content: space-evenly;
  justify-items: center;
  align-content: space-evenly;
  align-items: center;
  margin-top: 10%;
}
</style>