<template>
  <NavbarComp></NavbarComp>
  <div>
    <div class="card">
      <Toolbar class="mb-4" id="toolBar">
        <template #start>
          <div class="btnToolbar">
            <Button
              label="Añadir"
              icon="pi pi-plus"
              class="p-button-success mr-2"
              @click="openNew"
              style="
                width: 50%;
                margin-left: 5%;
                margin-right: 5%;
                text-align: center;
              "
            />
            <Button
              label="Eliminar"
              icon="pi pi-trash"
              class="p-button-danger"
              style="width: 50%; margin-left: 5%; text-align: start"
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

      <div class="fondoTabla">
        <DataTable
          ref="dt"
          :value="products"
          v-model:selection="selectedProducts"
          dataKey="id"
          :paginator="true"
          :rows="5"
          :filters="filters"
          style="background-color: #ffe1e1"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords} ordenes"
          responsiveLayout="scroll"
          class="dataTable"
        >
          <template #header>
            <div
              class="table-header flex flex-column md:flex-row md:justiify-content-between"
              style="background-color: #ffe1e1"
            >
              <h1
                class="mb-2 md:m-0 p-as-md-center"
                style="text-align: center; font-size: 1.5rem"
              >
                Ordenes
              </h1>
            </div>
          </template>

          <Column
            selectionMode="multiple"
            style="width: 3rem; background-color: #ffe1e1"
            :exportable="false"
          ></Column>
          <Column
            field="N°"
            header="N°"
            :sortable="true"
            style="min-width: 6rem; background-color: #ffe1e1"
          ></Column>
          <Column
            field="Cliente"
            header="Cliente"
            :sortable="true"
            style="min-width: 8rem; background-color: #ffe1e1"
          ></Column>
          <Column
            field="Estado"
            header="Estado"
            :sortable="true"
            style="min-width: 4rem; background-color: #ffe1e1"
          >
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column
            field="Preset"
            header="Preset"
            :sortable="true"
            style="min-width: 4rem; background-color: #ffe1e1"
          ></Column>
          <Column
            field="CargaActual"
            header="Carga actual"
            :sortable="true"
            style="min-width: 4rem; background-color: #ffe1e1"
          >
            <template #body="slotProps">
              <Rating
                :modelValue="slotProps.data.rating"
                :readonly="true"
                :cancel="false"
              />
            </template>
          </Column>
          <Column
            field="Camion "
            header="Camion"
            :sortable="true"
            style="min-width: 12rem; background-color: #ffe1e1"
          >
            <template #body="slotProps">
              <span
                :class="
                  'product-badge status-' +
                  (slotProps.data.inventoryStatus
                    ? slotProps.data.inventoryStatus.toLowerCase()
                    : '')
                "
                >{{ slotProps.data.inventoryStatus }}</span
              >
            </template>
          </Column>
          <Column
            field="Acciones"
            header="Acciones"
            :sortable="true"
            style="min-width: 6rem; background-color: #ffe1e1"
          >
            <template #body="slotProps">
              <span
                :class="
                  'product-badge status-' +
                  (slotProps.data.inventoryStatus
                    ? slotProps.data.inventoryStatus.toLowerCase()
                    : '')
                "
                >{{ slotProps.data.inventoryStatus }}</span
              >
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
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

<style lang="scss" scoped>
#toolBar {
  width: 60%;
  text-align: center;
  margin: auto;
  margin-top: 4rem;
  border-radius: 35px;
  background-color: #ffe1e1;
  border: none;
}

.btnToolbar {
  display: flex;
  width: 17rem;
}

.dataTable{
  width: 99%;
  
  border-radius: 36px;
  margin: auto;
}

.fondoTabla{
  width: 90%;
  margin: auto;
  border-radius: 35px;
  background-color: #ffe1e1;
}
</style>
