<template>
  <div class="contenedorLogin">
    <div class="ingresoTitulo">
      <p>Ingreso al sistema</p>
    </div>

    <div class="containerUsuario">
      <div class="tituloBox">
        <p>Usuario</p>
      </div>

      <input type="text"
      placeholder="Ingrese su usuario">

      </div>

    <div class="containerContrasenia">
      <div class="tituloBox">
        <p>Contraseña</p>
      </div>

      <input type="password" placeholder="Ingrese su contraseña">
    </div>

    <button @click="ingresar()">Ingresar</button>
    <LoaderComp></LoaderComp>
  </div>
  
</template>

<script>
import LoaderComp from "@/components/LoaderComp.vue"

export default {
  name: "HomePage",
  components: {
    LoaderComp,
  },
  methods: {
    ingresar(){
      this.$router.push('/orden');
    }
  }
};
</script>

<style scoped>
.contenedorLogin{
  width: 412px;
  height: 554px;
  margin: auto;
  margin-top: 15vh;

  background: #FFE1E1;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 31px;
}

.ingresoTitulo{
  font-family: 'Kurale';
  font-style: normal;
  font-size: 33px;
  text-align: center;
  line-height: 6rem;
}

.containerUsuario{
  text-align: center;
}

.tituloBox{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
  
}

input{
  color: #000000;
  width: 90%;
  height: 33px;
  text-align: center;

  background: #FFB3B3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 53px;
  border:0;outline:0;
  
}

.containerContrasenia{
  margin-top: 10%;
  text-align: center;
}

::-webkit-input-placeholder{
  color: #FFE1E1;
  text-align: center;
  -webkit-transition: all 500ms ease;
  -moz-transition: all 500ms ease;
  -ms-transition: all 500ms ease;
  -o-transition: all 500ms ease;
  transition: all 500ms ease;
}


:hover::-webkit-input-placeholder{
  color:#000000;
  -webkit-transition: all 500ms ease;
  -moz-transition: all 500ms ease;
  -ms-transition: all 500ms ease;
  -o-transition: all 500ms ease;
  transition: all 500ms ease;
}

button{
  background: #F9629F;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 44px;

  margin-top: 20%;
  margin-left: 35%;
  text-align: center;
  width: 30%;
  height: 8%;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  color:#FFFFFF;
  border:0;outline:0;
  cursor:pointer;
  -webkit-transition: all 500ms ease;
  -moz-transition: all 500ms ease;
  -ms-transition: all 500ms ease;
  -o-transition: all 500ms ease;
  transition: all 500ms ease;
}

button:hover{
  background-color: #C42525;
  -webkit-transition: all 500ms ease;
  -moz-transition: all 500ms ease;
  -ms-transition: all 500ms ease;
  -o-transition: all 500ms ease;
  transition: all 500ms ease;
}

@media (max-width: 800px) and (min-width: 400px){
  input{
    height: 60px;
    text-align: center;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -ms-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
  }
  button{
    width: 50%;
    height: 10%;
    margin-left: 24.5%;
    margin-top: 15%;
  }

  ::-webkit-input-placeholder{
    font-size: 22px;
  }
}

@media (max-width: 1440px) and (min-width: 801px){
  input{
    height: 50px;
    text-align: center;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -ms-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
  }
  button{
    width: 35%;
    height: 10%;
    margin-left: 32.5%;
    margin-top: 15%;
  }
  ::-webkit-input-placeholder{
    font-size: 18px;
  }

}

@media (min-width: 1441px){
  input{
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -ms-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
  }
}

</style>