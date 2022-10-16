<template>
  <div>
      <Toast />
      
      <div class="card">
          <Steps :model="items" :readonly="true" />
      </div>

      <router-view v-slot="{Component}" :formData="formObject" @prevPage="prevPage($event)" @nextPage="nextPage($event)" @complete="complete">
          <keep-alive>
              <component :is="Component" />
          </keep-alive>
      </router-view>
  </div>
</template>

<script>
export default {
  data() {
      return {
          items: [{
              label: 'Personal',
              to: '/'
          },
          {
              label: 'Seat',
              to: '/seat'
          },
          {
              label: 'Payment',
              to: '/payment'
          },
          {
              label: 'Confirmation',
              to: '/confirmation'
          }],
          formObject: {}
      }
  },
  methods: {
      nextPage(event) {
          for (let field in event.formData) {
              this.formObject[field] = event.formData[field];
          }

          this.$router.push(this.items[event.pageIndex + 1].to);
      },
      prevPage(event) {
          this.$router.push(this.items[event.pageIndex - 1].to);
      },
      complete() {
          this.$toast.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + this.formObject.firstname + ' ' + this.formObject.lastname + ' your order completed.'});
      }
  }
}
</script>

<style scoped>
::v-deep(b) {
  display: block;
}

::v-deep(.p-card-body) {
  padding: 2rem;
}
</style>