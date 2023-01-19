<template>
  <div>
    <div class="navbar">
      <a href="/orden">Ordenes</a>
      <a href="/camion">Camiones</a>
      <a href="/chofer">Choferes</a>
      <a href="/cliente">Clientes</a>
      <a href="/producto">Productos</a>
      <a href="/" class="btnSalir">Salir</a>
    </div>
  </div>
</template>

<script>
export default {
  
};
</script>

<style scoped>
.navbar {
  overflow: hidden;
  background-color: #FFE1E1;
  font-family: Arial, Helvetica, sans-serif;
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
  padding: 20px 22px;
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

</style>
