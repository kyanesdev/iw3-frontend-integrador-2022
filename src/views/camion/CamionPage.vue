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
              @click="openInsertDialog()"
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
                style="text-align: center; font-size: 1.5rem; font-weight: normal;"
              >
                Camiones
              </h1>
            </div>
          </template>

          <Column
            selectionMode="multiple"
            style="width: 4rem; background-color: #ffe1e1"
            :exportable="false"
          ></Column>
          <Column
            field="Patente"
            header="Patente"
            :sortable="true"
            style="min-width: 6rem; background-color: #ffe1e1"
          ></Column>
          <Column
            field="Cisternado"
            header="Cisternado"
            :sortable="true"
            style="min-width: 8rem; background-color: #ffe1e1"
          ></Column>
          <Column
            field="Descripcion"
            header="Descripción"
            :sortable="true"
            style="min-width: 4rem; background-color: #ffe1e1"
          >
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column
            field="Acciones"
            header="Acciones"
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
    <Dialog v-model:visible="display">
      
      <template #header>
        <h3>Añadir un camión</h3>
      </template>

      <div>
        <p>Patente</p>
        <input type="text" name="" placeholder="Ingrese la patente"/>

        <p>Cisternado</p>
        <input type="text" name="" placeholder="Ingrese el cisternado"/>

        <p>Descripción</p>
        <textarea name="" id="" cols="30" rows="10" placeholder="Describe aquí..."></textarea>
      </div>

      <template #footer>
        <Button label="Aceptar" icon="pi pi-check" />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          class="p-button-text"
          @click="closeDialog()"
        />
      </template>
    </Dialog>
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
      display: false,
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
  methods: {
    openInsertDialog() {
      this.display = true;
    },
    closeDialog() {
      this.display = false;
    },
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
  width: 96%;
  border-radius: 36px;
  margin: auto;
}

.fondoTabla{
  width: 90%;
  margin: auto;
  border-radius: 35px;
  background-color: #ffe1e1;
}

input{
  color: #000000;
  width: 90%;
  height: 33px;
  text-align: center;

  background: #ffe1e1;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 53px;
  border:0;outline:0;
  
}

::-webkit-input-placeholder{
  color: #FFB3B3;
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

textarea{
  resize: none;
  color: #000000;
  width: 100%;
  text-align: center;

  background: #ffe1e1;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border:0;outline:0;
}
</style>
