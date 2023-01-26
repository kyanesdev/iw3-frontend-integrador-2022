<template>
  <div>
    <div class="navbar">
      <a href="/orden">Ordenes</a>
      <a href="/camion">Camiones</a>
      <a href="/chofer">Choferes</a>
      <a href="/cliente">Clientes</a>
      <a href="/producto">Productos</a>
      <a href="/" class="btnSalir">Salir</a>
      <LoaderComp></LoaderComp>
    </div>
  </div>
  
</template>

<script>
import LoaderComp from "@/components/LoaderComp.vue"

export default {
  components: {
    LoaderComp
  }
};
</script>

<style scoped>
.navbar {
  overflow: hidden;
  background-color: #FFE1E1;
  font-family: 'Inter';
  border-radius: 31px;
  width: 50%;
  height: 60px;
  margin: auto;
}

.navbar a {
  float: left;
  font-size: 18px;
  color: #000000;
  text-align: center;
  padding: 20px 20.17px;
  text-decoration: none;
  -webkit-transition: all 500ms ease;
  -moz-transition: all 500ms ease;
  -ms-transition: all 500ms ease;
  -o-transition: all 500ms ease;
  transition: all 500ms ease;
}

.navbar a:hover{
  background-color: #F8C8C8;
  -webkit-transition: all 500ms ease;
  -moz-transition: all 500ms ease;
  -ms-transition: all 500ms ease;
  -o-transition: all 500ms ease;
  transition: all 500ms ease;
}
.btnSalir{
  margin-left: 14.986rem;
  -webkit-transition: all 500ms ease;
  -moz-transition: all 500ms ease;
  -ms-transition: all 500ms ease;
  -o-transition: all 500ms ease;
  transition: all 500ms ease;
}

.navbar .btnSalir:hover{
  background-color: #C42525;
  -webkit-transition: all 500ms ease;
  -moz-transition: all 500ms ease;
  -ms-transition: all 500ms ease;
  -o-transition: all 500ms ease;
  transition: all 500ms ease;
}

@media (max-width: 1397px) and (min-width: 400px){
  .navbar a {
  padding: 20px 13.17px;
 
  }

  .btnSalir{
  margin: auto;
  -webkit-transition: all 500ms ease;
  -moz-transition: all 500ms ease;
  -ms-transition: all 500ms ease;
  -o-transition: all 500ms ease;
  transition: all 500ms ease;
}
}

@media (max-width: 1440px) and (min-width: 801px){
  .btnSalir{
  margin-left: 1.55vw;
  -webkit-transition: all 500ms ease;
  -moz-transition: all 500ms ease;
  -ms-transition: all 500ms ease;
  -o-transition: all 500ms ease;
  transition: all 500ms ease;
}
}

@media (max-width: 1500px) and (min-width: 1441px){
  .btnSalir{
  margin-left: 3vw;
  -webkit-transition: all 500ms ease;
  -moz-transition: all 500ms ease;
  -ms-transition: all 500ms ease;
  -o-transition: all 500ms ease;
  transition: all 500ms ease;
}
}

@media (max-width: 1700px) and (min-width: 1501px){
  .btnSalir{
  margin-left: 4.8vw;
  -webkit-transition: all 500ms ease;
  -moz-transition: all 500ms ease;
  -ms-transition: all 500ms ease;
  -o-transition: all 500ms ease;
  transition: all 500ms ease;
}
}

</style>
