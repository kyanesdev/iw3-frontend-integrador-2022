<template>
  <NavbarComp></NavbarComp>
  <div>
    <Toolbar class="mb-4" id="toolBar">
      <template #start>
        <div class="btnToolbar">
          <Button
          label="Añadir"
          icon="pi pi-plus"
          class="p-button-success mr-2"
          @click="openNew"
          style="width: 50%;
          margin-left: 5%;
          margin-right: 5%;
          text-align: center;
          "
        />
        <Button
          label="Eliminar"
          icon="pi pi-trash"
          class="p-button-danger"
          style="width: 50%;
          margin-left: 5%;
          text-align: start;"
          @click="confirmDeleteSelected"
          :disabled="!selectedProducts || !selectedProducts.length"
        />
        </div>
        
      </template>

      <template #end>
        <FileUpload
          mode="basic"
          accept="image/*"
          :maxFileSize="1000000"
          label="Import"
          chooseLabel="Import"
          class="mr-2 inline-block"
        />
        <Button
          label="Cambiar Estado"
          icon="pi pi-bars"
          class="p-button-help"
          @click="exportCSV($event)"
        />
      </template>
    </Toolbar>
  </div>
</template>

<script>
import NavbarComp from "@/components/NavbarComp.vue";

export default {
  components: {
    NavbarComp,
  },
  data() {
    return {
      products: null,
      productDialog: false,
      deleteProductDialog: false,
      deleteProductsDialog: false,
      product: {},
      selectedProducts: null,
      filters: {},
      submitted: false,
      statuses: [
        { label: "INSTOCK", value: "instock" },
        { label: "LOWSTOCK", value: "lowstock" },
        { label: "OUTOFSTOCK", value: "outofstock" },
      ],
    };
  },
};
</script>

<style scoped>
#toolBar{
  width: 60%;
  text-align: center;
  margin: auto;
  margin-top: 4rem;
  border-radius: 35px;
  background-color: #FFE1E1;
}
.btnToolbar{
  display: flex;
  width: 17rem;
}
</style>
