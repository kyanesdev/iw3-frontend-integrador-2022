<template>
  <div class="menu">
    <MenuCard cardName="Camion" name="Camion" pathLoad="/truck" pathSave="/save/truck"/>
    <MenuCard cardName="Cliente" name="Cliente" pathLoad="/customer" pathSave="/save/customer"/>
    <MenuCard cardName="Orden" name="Orden" pathLoad="/order" pathSave="/save/order"/>
    <MenuCard cardName="Chofer" name="Chofer" pathLoad="/trucker" pathSave="/save/trucker"/>
    <MenuCard cardName="Producto" name="Producto" pathLoad="/product" pathSave="/save/product"/>
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