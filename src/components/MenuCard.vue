<template>
  <div class="card">
    <Card>
      <template #title> {{ cardName }} </template>
      <template #footer>
        <Button @click="goTo()">{{ buttonText }}</Button>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  name: "MenuCard",
  props: {
    cardName: String,
    buttonText: String,
    path: String,
  },
  methods: {
    goTo() {
      this.$router.push(this.path);
    },
  },
};
</script>

<style scoped>
.card {
  text-align: center;
  width: 200px;
  height: 200px;
}
</style>