<template>
  <div class="container">
    <Card class="card">
      <template #title> {{ cardName }} </template>
      <template #footer>      
        <Button @click="goToSave()">Agregar {{ name }}</Button>
        <Button @click="goToLoad()">Ver {{ name }} </Button>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  name: "MenuCard",
  props: {
    cardName: String,
    name: String,
    pathLoad: String,
    pathSave: String
  },
  methods: {
    goToLoad() {
      this.$router.push(this.pathLoad);
    },
    goToSave(){
      this.$router.push(this.pathSave);
    }
  },
};
</script>

<style scoped>
.container {
  text-align: center;
  margin: 10%;
  display: flex;
  align-items: center;
  width: 45vh;
  height: 100%;
  padding: 20%;
}

.card{
  text-align: center;
  width: 60vh;
  height: 100%;
  padding: 5%;
  border-radius: 8%;
  backdrop-filter: blur(14px);
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 15px 25px rgba(129, 124, 124, 0.2);
  color:aliceblue
}

button {
  margin: 2px;
}
</style>