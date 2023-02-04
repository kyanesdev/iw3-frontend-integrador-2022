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
                Choferes
              </h1>
            </div>
          </template>

          <Column
            selectionMode="multiple"
            style="width: 4rem; background-color: #ffe1e1"
            :exportable="false"
          ></Column>
          <Column
            field="nombre"
            header="Nombre"
            :sortable="true"
            style="min-width: 6rem; background-color: #ffe1e1"
          ></Column>
          <Column
            field="apellido"
            header="Apellido"
            :sortable="true"
            style="min-width: 8rem; background-color: #ffe1e1"
          ></Column>
          <Column
            field="dni"
            header="DNI"
            :sortable="true"
            style="min-width: 4rem; background-color: #ffe1e1"
          >
          </Column>
          <Column
            field="Acciones"
            header="Acciones"
            style="min-width: 6rem; background-color: #ffe1e1"
          >
            <template #body="slotProps">
              <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deleteProduct(slotProps.data)"
                style="margin-right: 5px" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <Dialog v-model:visible="display">
      <template #header>
        <h3>Añadir un chofer</h3>
      </template>

      <div>
        <p>Nombre</p>
        <input type="text" name="" v-model="product.nombre" placeholder="Ingrese el nombre" />

        <p>Apellido</p>
        <input type="text" name="" v-model="product.apellido" placeholder="Ingrese el apellido" />

        <p>DNI</p>
        <input type="text" name="" v-model="product.dni" placeholder="Ingrese el DNI" />
      </div>

      <template #footer>
        <Button label="Aceptar" icon="pi pi-check" @click="save()" />
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="closeDialog()" />
      </template>
    </Dialog>

    <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Peligro" :modal="true"
      class="p-fluid">
      <template #header>
        <h5>Confirmar</h5>
      </template>
      <div class="p-field">
        <span style="font-size: 20px;">¿Estas seguro que quieres eliminar el/los productos?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text" @click="closeDialog()" />
        <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts()" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import NavbarComp from "@/components/NavbarComp.vue";
import ChoferService from "@/services/chofer/ChoferService";
import Swal from 'sweetalert2'

export default {
  components: {
    NavbarComp,
  },
  ChoferService: null,
  data() {
    return {
      display: false,
      products: [],
      productDialog: false,
      deleteProductDialog: false,
      deleteProductsDialog: false,
      product: {},
      selectedProducts: [],
      filters: {},
      submitted: false,
      statuses: [
        { label: "INSTOCK", value: "instock" },
        { label: "LOWSTOCK", value: "lowstock" },
        { label: "OUTOFSTOCK", value: "outofstock" },
      ],
    };
  },
  created() {
    this.ChoferService = new ChoferService();
  },
  mounted() {
    this.ChoferService.getAll().then((data) => {
      this.products = data;
      console.log(data);
    });
  },
  methods: {
    openInsertDialog() {
      this.display = true;
    },
    closeDialog() {
      this.display = false;
      this.deleteProductsDialog = false;
    },
    save() {

      console.log(this.product);

      this.display = false;

      this.ChoferService.create(this.product).then((data) => {
        console.log(data);
      });

      Swal.fire({
        icon: 'success',
        title: `Guardado Correctamente`,
        showConfirmButton: false,
        timer: 1500,
      })

      setTimeout(() => {
        this.$router.go();
      }, 1500);

    },
    deleteProduct(product) {
      console.log(product);
      this.selectedProducts.push(product);
      this.deleteProductsDialog = true;
    },
    confirmDeleteSelected() {
      this.deleteProductsDialog = true;
    },
    deleteSelectedProducts() {
      let products = this.selectedProducts;
      let _products = [];
      products.forEach((product) => {
        _products.push(product.id);
      });

      console.log(_products);

      this.deleteProductsDialog = false

      _products.forEach((product) => {
        console.log(product);
        this.ChoferService.delete(product).then((data) => {
          console.log(data);
        });
      });

      Swal.fire({
        icon: 'success',
        title: `Eliminado Correctamente`,
        showConfirmButton: false,
        timer: 1500,
      })

      setTimeout(() => {
        this.$router.go();
      }, 1500);

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
  textarea{
    height: 260px;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -ms-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
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
  textarea{
    height: 210px;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -ms-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
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
  textarea{
    height: 180px;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -ms-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
  }
}
</style>
