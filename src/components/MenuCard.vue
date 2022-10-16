<template>
  <div class="card">
    <Card>
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
.card {
  text-align: center;
  width: 200px;
  height: 200px;
}

button {
  margin: 2px;
}
</style>