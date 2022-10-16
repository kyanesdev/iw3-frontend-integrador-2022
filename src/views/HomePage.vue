<template>
  <div class="menu">
    <MenuCard cardName="Camion" name="Camion" pathLoad="/camion" pathSave="/carga/camion"/>
    <MenuCard cardName="Cliente" name="Cliente" pathLoad="/cliente" pathSave="/carga/cliente"/>
    <MenuCard cardName="Orden" name="Orden" pathLoad="/orden" pathSave="/carga/orden"/>
    <MenuCard cardName="Chofer" name="Chofer" pathLoad="/chofer" pathSave="/carga/chofer"/>
    <MenuCard cardName="Producto" name="Producto" pathLoad="/producto" pathSave="/carga/producto"/>
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