<template>
  <NavbarComp></NavbarComp>
  <div>
    <div class="card">
      <Toolbar class="mb-4" id="toolBar" style="margin-bottom:10px;">
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
                style="
                  text-align: center;
                  font-size: 1.5rem;
                  font-weight: normal;
                "
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
            field="id"
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
            field="camion"
            header="Camion"
            :sortable="true"
            style="min-width: 12rem; background-color: #ffe1e1"
          >
            
          </Column>
          <Column
            field="Acciones"
            header="Acciones"
            style="min-width: 6rem; background-color: #ffe1e1"
          >
            <template #body="slotProps">
              <Button 
              icon="pi pi-info" 
              class="p-button-rounded p-button-info" 
              @click="infoItem(slotProps.data)" 
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <Dialog v-model:visible="display">
      <template #header>
        <h3>Añadir una orden</h3>
      </template>

      <div>
        <label for="cliente">Cliente</label>
        <div class="espacioVacios"></div>
        <select id="cliente" name="cliente">
          <option disabled selected class="opcionDesactivada">
            Seleccione un cliente
          </option>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
        </select>

        <p>Preset</p>
        <input type="text" name="" placeholder="Ingrese el preset" />

        <div class="espacioVacios"></div>
        <label for="camion">Camión</label>
        <div class="espacioVacios"></div>
        <select id="camion" name="camion">
          <option disabled selected class="opcionDesactivada">
            Seleccione un camión
          </option>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
        </select>

        <div class="espacioVacios"></div>
        <label for="chofer">Chofer</label>
        <div class="espacioVacios"></div>

        <select id="chofer" name="chofer">
          <option disabled selected class="opcionDesactivada">
            Seleccione un chofer
          </option>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
        </select>

        <div class="espacioVacios"></div>
        <label for="producto">Producto</label>
        <div class="espacioVacios"></div>
        <span class="input-select">
          <select id="producto" name="producto">
            <option disabled selected class="opcionDesactivada">
              Seleccione un producto
            </option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="fiat">Fiat</option>
            <option value="audi">Audi</option>
          </select>
        </span>
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
      products: [{id:1,camion:"optimus"}],
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

.dataTable {
  width: 96%;
  border-radius: 36px;
  margin: auto;
}

.fondoTabla {
  width: 90%;
  margin: auto;
  border-radius: 35px;
  background-color: #ffe1e1;
}

.espacioVacios {
  margin-top: 15px;
}

input {
  color: #000000;
  width: 90%;
  height: 33px;
  text-align: center;

  background: #ffe1e1;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 53px;
  border: 0;
  outline: 0;
}

::-webkit-input-placeholder {
  color: #ffb3b3;
  text-align: center;
  -webkit-transition: all 500ms ease;
  -moz-transition: all 500ms ease;
  -ms-transition: all 500ms ease;
  -o-transition: all 500ms ease;
  transition: all 500ms ease;
}

:hover::-webkit-input-placeholder {
  color: #000000;
  -webkit-transition: all 500ms ease;
  -moz-transition: all 500ms ease;
  -ms-transition: all 500ms ease;
  -o-transition: all 500ms ease;
  transition: all 500ms ease;
}
select {
  resize: none;

  color: #ffb3b3;
  width: 100%;
  height: 2.5vh;
  text-align: center;

  background: #ffe1e1;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border: 0;
  outline: 0;
  -webkit-transition: all 500ms ease;
  -moz-transition: all 500ms ease;
  -ms-transition: all 500ms ease;
  -o-transition: all 500ms ease;
  transition: all 500ms ease;
}

select:hover {
  color: #000000;
}

option {
  -webkit-transition: all 200ms ease;
  -moz-transition: all 200ms ease;
  -ms-transition: all 200ms ease;
  -o-transition: all 200ms ease;
  transition: all 200ms ease;
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
  select{
    height: 70px;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -ms-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
    font-size: 22px;
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
  select{
    height: 50px;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -ms-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
    font-size: 18px;
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
