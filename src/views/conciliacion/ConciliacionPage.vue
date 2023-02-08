<template>
    <NavbarComp></NavbarComp>
    <div>
      <div class="card">
        <Toolbar class="mb-4" id="toolBar" style="margin-bottom:10px;">
          <template #start>            
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
            :value="conciliacion"
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
                  Conciliaciones
                </h1>
              </div>
            </template>
  
            <Column
              field="pesajeInicial"
              header="Pesaje inicial"
              :sortable="true"
              style="min-width: 6rem; background-color: #ffe1e1"
            ></Column>
            <Column
                field="pesajeFinal"
                header="Pesaje final"
                :sortable="true"
                style="min-width: 6rem; background-color: #ffe1e1"
            ></Column>

            <Column
                field="productoCargado"
                header="Producto cargado"
                :sortable="true"
                style="min-width: 6rem; background-color: #ffe1e1"
            ></Column>

            <Column
                field="netoPorBalanza"
                header="Neto por balanza"
                :sortable="true"
                style="min-width: 6rem; background-color: #ffe1e1"
            ></Column>

            <Column
                field="diferenciaEntreBalanzaCaudalimetro"
                header="Dif balanza caudalimetro"
                :sortable="true"
                style="min-width: 6rem; background-color: #ffe1e1"
            ></Column>

            <Column
                field="promedioTemperatura"
                header="Prom temp"
                :sortable="true"
                style="min-width: 6rem; background-color: #ffe1e1"
            ></Column>

            <Column
                field="promedioDensidad"
                header="Prom dens"
                :sortable="true"
                style="min-width: 6rem; background-color: #ffe1e1"
            ></Column>

            <Column
                field="promedioCaudal"
                header="Prom caudal"
                :sortable="true"
                style="min-width: 6rem; background-color: #ffe1e1"
            ></Column>
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
        conciliacion: [],
        display: false,
        products: null,
        product: {},
        selectedProducts: null,
      };
    },
    mounted() {
      this.conciliacion.push(JSON.parse(localStorage.getItem('conciliacion'))) 
    },
    methods: {
      
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