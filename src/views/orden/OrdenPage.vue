<template>
  <NavbarComp></NavbarComp>
  <div>
    <div class="card">
      <Toolbar class="mb-4" id="toolBar" style="margin-bottom:10px;">
        <template #start>
          <div class="btnToolbar">
            <Button label="Añadir" icon="pi pi-plus" class="p-button-success mr-2" @click="openInsertDialog()" style="
                width: 50%;
                margin-left: 5%;
                margin-right: 5%;
                text-align: center;
              " />
            <Button label="Eliminar" icon="pi pi-trash" class="p-button-danger"
              style="width: 50%; margin-left: 5%; text-align: start" @click="confirmDeleteSelected"
              :disabled="!selectedProducts || !selectedProducts.length" />
          </div>
        </template>

        <template #end>
          <Button label="Agregar Detalle" icon="pi pi-bars" class="p-button-warning" :disabled="selectedProducts.length != 1"
            @click="agregaDetalleDialog()" />

          <Button label="Cambiar Estado" icon="pi pi-bars" class="p-button-help"
            :disabled="selectedProducts.length != 1" @click="cambiarEstado()" />
            
        </template>
      </Toolbar>

      <div class="fondoTabla">
        <DataTable ref="dt" :value="orders" v-model:selection="selectedProducts" dataKey="id" :paginator="true"
          :rows="5" :filters="filters" style="background-color: #ffe1e1"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords} ordenes" responsiveLayout="scroll"
          class="dataTable">
          <template #header>
            <div class="table-header flex flex-column md:flex-row md:justiify-content-between"
              style="background-color: #ffe1e1">
              <h1 class="mb-2 md:m-0 p-as-md-center" style="
                  text-align: center;
                  font-size: 1.5rem;
                  font-weight: normal;
                ">
                Ordenes
              </h1>
            </div>
          </template>

          <Column selectionMode="multiple" style="width: 3rem; background-color: #ffe1e1" :exportable="false"></Column>
          <Column field="numeroOrden" header="N°" :sortable="true" style="min-width: 6rem; background-color: #ffe1e1">
          </Column>
          <Column field="cliente.nombre" header="Cliente" :sortable="true"
            style="min-width: 8rem; background-color: #ffe1e1"></Column>
          <Column field="estado" header="Estado" :sortable="true" style="min-width: 4rem; background-color: #ffe1e1">

          </Column>
          <Column field="preset" header="Preset" :sortable="true" style="min-width: 4rem; background-color: #ffe1e1">
          </Column>

          <Column field="camion.patente" header="Camion" :sortable="true"
            style="min-width: 12rem; background-color: #ffe1e1">

          </Column>
          <Column field="Acciones" header="Acciones" style="min-width: 6rem; background-color: #ffe1e1">
            <template #body="slotProps">
              <Button icon="pi pi-info" class="p-button-rounded p-button-info" :disabled="slotProps.data.estado !== 2"
                @click="info(slotProps.data)" />
              <Button icon="pi pi-clock" class="p-button-rounded p-button-warning"
                @click="generarAlertaDialog(slotProps.data)" />
              <Button icon="pi pi-plus-circle" class="p-button-rounded p-button-success"
                @click="addConciliation(slotProps.data)" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <Dialog v-model:visible="masInfo">
      <template #header>
        <h3> Más información: </h3>
      </template>

      <div class="p-field">
        <label>Número orden: {{ order.numeroOrden }}</label><br />
        <label>Fecha recepcion: {{ order.fechaRecepcionExt }} </label><br />
        <label>Fecha recepcion pesaje inicial: {{ order.fechaRecepcionPesaje }} </label><br />
        <label>Fecha carga prevista: {{ order.fechaCargaPrevista }} </label><br />
        <label v-if="order.fechaInicioCarga">Fecha incio carga: {{ order.fechaInicioCarga }} <br /></label>
        <label v-if="tiempoTranscurrido">Tiempo transcurrido desde incio de carga: {{
          tiempoTranscurrido
        }}<br /></label>
        <label v-if="eta">ETA: {{ eta }}<br /></label>
        <label>Preset: {{ order.preset }} </label><br />
        <label>Tara: {{ order.tara }} </label><br />
        <label>Password: {{ order.password }}</label><br />
      </div>

    </Dialog>

    <Dialog header="Aviso de alarma" v-model:visible="alertaMailDialog" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
      Se activó la alarma de temperatura,
      presione confirmar para dejar asentado su conocimiento
      <template #footer>
        <Button label="Confirmar" autofocus @click="closeDialog" />
      </template>
    </Dialog>

    <Dialog v-model:visible="display" style="width: 50%;">
      <template #header>
        <h3>Añadir una orden</h3>
      </template>

      <div>
        <p>Codigo Externo</p>
        <input type="text" name="" v-model="test" />

        <p>Numero de orden</p>
        <input type="number" name="" v-model="cli1Orden.numeroOrden" />

        <p>Patente del vehiculo</p>
        <input type="text" name="" v-model="cli1Orden.patente" />

        <p>Producto</p>
        <input type="text" name="" v-model="cli1Orden.producto" />

        <p>DNI del chofer</p>
        <input type="number" name="" v-model="cli1Orden.dniChofer" />

        <p>Cliente</p>
        <input type="text" name="" v-model="cli1Orden.cliente" />

        <p>Fecha de carga prevista</p>
        <!--TODO: hacer bonito-->
        <Calendar v-model="cli1Orden.fechaCargaPrevista_orden" :inline="false" selectionMode="single"
          dateFormat="dd-mm-yy" />

        <p>Alerta</p>
        <input type="number" name="" v-model="alerta.tempUmbral" />

        <p>Preset</p>
        <input type="number" name="" v-model="cli1Orden.orden_preset" />


      </div>

      <template #footer>
        <Button label="Aceptar" icon="pi pi-check" @click="save()" />
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="closeDialog()" />
      </template>
    </Dialog>

    <!--Dialog de alerta-->
    <Dialog v-model:visible="alertDialog" style="width: 50%;">
      <template #header>
        <h3>Alerta</h3>
      </template>
      <p>Introduzca el valor de la alerta</p>
      <input type="number" name="" v-model="alerta.tempUmbral" />
      <template #footer>
        <Button label="Aceptar" icon="pi pi-check" @click="generarAlerta(true)" />
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="closeDialog()" />
      </template>
    </Dialog>

    <!--Dialog de pesaje inicial-->
    <Dialog v-model:visible="pesajeInicialDialog">
      <template #header>
        <h3>Pesjae inical</h3>
      </template>
      <p>Introduzca el valor de la tara</p>
      <input type="number" name="" v-model="tara" />
      <template #footer>
        <Button label="Aceptar" icon="pi pi-check" @click="CargaPesajeInicial()" />
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="closeDialog()" />
      </template>
    </Dialog>

    <!--Dialog cerrar orden-->
    <Dialog v-model:visible="cerrarOrdenDialogProp">
      <h3>¿Esta seguro de querer cerrar la orden?</h3>
      <template #footer>
        <Button label="Aceptar" icon="pi pi-check" @click="cerrarOrden()" />
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="closeDialog()" />
      </template>
    </Dialog>

    <!--Dialog de pesaje final-->
    <Dialog v-model:visible="pesajeFinalDialog">
      <template #header>
        <h3>Pesaje final</h3>
      </template>
      <p>Introduzca el valor del pesaje final</p>
      <input type="number" name="" v-model="pesajeFinal" />
      <template #footer>
        <Button label="Aceptar" icon="pi pi-check" @click="CargaPesajeFinal()" />
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="closeDialog()" />
      </template>
    </Dialog>

    <!--
    {
        "ultMasaAcumulada": 1,
        "desidadProducto": 2,
        "tempProducto": 505050,
        "caudal": 1,
        "estado": 2,
        "cantidadActualizaciones": 10,
        "orden": {
          "id": this.order.id
        }
      }
    -->
    <Dialog v-model:visible="agregaDetalleDialogProp" style="width: 50%;">
      <template #header>
        <h3>Generar un detalle</h3>
      </template>

      <div>
        <p>Ultima masa acumulada</p>
        <input type="number" name="" v-model="detalle.ultMasaAcumulada" />

        <p>Desidad del producto</p>
        <input type="number" name="" v-model="detalle.desidadProducto" />

        <p>Temperatura del producto</p>
        <input type="number" name="" v-model="detalle.tempProducto" />

        <p>Caudal</p>
        <input type="number" name="" v-model="detalle.caudal" />

        <p>Estado</p>
        <input type="number" name="" v-model="detalle.estado" />

        <p>Cantidad de actualizaciones</p>
        <input type="number" name="" v-model="detalle.cantidadActualizaciones" />

      </div>

      <template #footer>
        <Button label="Aceptar" icon="pi pi-check" @click="cargarDetalle()" />
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="closeDialog()" />
      </template>
    </Dialog>

  </div>

</template>

<script>
import NavbarComp from "@/components/NavbarComp.vue";
import OrdenService from "@/services/orden/OrdenService";
import OrdenCli1Service from "@/services/orden/Cli/OrdenCli1Service";
import DetalleService from "@/services/detalle/DetalleService"
import AlertaService from "@/services/alerta/AlertaService";
import Swal from 'sweetalert2'

export default {
  components: {
    NavbarComp,
  },

  OrdenService: null,
  DetalleService: null,
  OrdenCli1Service: null,
  AlertaService: null,

  data() {
    return {
      display: false,
      displayDetalle: false,
      orders: [],
      alertaMailDialog: false,
      order: { notificacion: 1 },
      cli1Orden: {},
      test: null,
      detalles: [],
      detalle: {},
      tara: null, // pesaje inicial
      pesajeFinal: null, // pesaje final
      alertDialog: false, // dialog de alerta
      pesajeInicialDialog: false, // dialog de pesaje inicial
      pesajeFinalDialog: false, // dialog de pesaje final
      cerrarOrdenDialogProp: false, // dialog de cerrar orden
      agregaDetalleDialogProp: false, // dialog de agregar detalle
      alerta: { tempUmbral: 2000 }, // temperatura por defecto a la cual se activa la alerta
      tiempoTranscurrido: 0,
      eta: 0,
      productDialog: false,
      deleteProductDialog: false,
      deleteProductsDialog: false,
      masInfo: false,
      selectedProducts: [],
      filters: {},
      submitted: false,
    };
  },
  created() {
    this.OrdenService = new OrdenService();
    this.DetalleService = new DetalleService();
    this.OrdenCli1Service = new OrdenCli1Service();
    this.AlertaService = new AlertaService();
  },
  mounted() {
    this.OrdenService.getAll().then((data) => {
      this.orders = data;
      console.log(data);
    });

    this.DetalleService.getAll().then((data) => {
      this.detalles = data;
      console.log(data);
    });
  },
  methods: {
    openInsertDialog() {
      this.display = true;
    },
    closeDialog() {
      this.display = false;
      this.pesajeInicialDialog = false;
      this.pesajeFinalDialog = false;
      this.cerrarOrdenDialogProp = false;
      this.agregaDetalleDialogProp = false;
      this.alertaMailDialog = false;
    },
    save() {
      console.log(this.cli1Orden);
      this.OrdenCli1Service.create(this.cli1Orden).then((data) => {
        console.log(data);

        this.order = data;

        this.display = false;

        this.generarAlerta(false)

        Swal.fire({
          icon: 'success',
          title: `Guardado Correctamente`,
          showConfirmButton: false,
          timer: 1500,
        })

      }).catch((error) => {
        console.log(error);
      });

    },
    info(orden) {
      this.order = orden
      this.masInfo = true

      var date = new Date();
      let x = orden.fechaInicioCarga.split("T")[1].split(":")

      let hour = Math.abs(Number(date.getHours()) - Number(x[0]));
      let min = Math.abs(Number(date.getMinutes()) - Number(x[1]));
      let sec = Math.abs(Number(date.getSeconds()) - Number(x[2].split("+")[0]));

      this.tiempoTranscurrido = `${hour}:${min}:${sec}`

      this.filtro(orden.id)

      this.eta = (Number(orden.preset) - Number(this.detalle.ultMasaAcumulada)) / Number(this.detalle.caudal)
    },
    filtro(id) {
      let tmp = this.detalles.filter(detalle => detalle.orden.id == id)

      this.detalle = tmp[tmp.length - 1]
    },
    cambiarEstado() {
      let orden = this.selectedProducts[0]

      const ESTADOS_ORDEN = {
        "1": () => { this.cargarPesajeIncialDialog(orden) },
        "2": () => { this.cerrarOrdenDialog(orden) },
        "3": () => { this.cargarPesajeFinalDialog(orden) },
        "4": () => { alert("No se pueden realizar mas cambios de estados"); },
      }

      ESTADOS_ORDEN[orden.estado]();
    },
    cargarPesajeIncialDialog(orden) {
      this.pesajeInicialDialog = true;
      this.order = orden;
      console.log(orden);
    },
    cerrarOrdenDialog(orden) {
      this.cerrarOrdenDialogProp = true;
      this.order = orden;
    },
    cargarPesajeFinalDialog(orden) {
      this.pesajeFinalDialog = true;
      this.order = orden;
    },
    CargaPesajeInicial() {

      this.OrdenService.addInitialWeight(this.order.id, this.tara).then((data) => {
        console.log(data);
        this.order = data
        this.pesajeInicialDialog = false;
        Swal.fire({
          icon: 'success',
          title: `Se añadio correctamente el peso inicial`,
          showConfirmButton: false,
          timer: 1500,
        })
      });

    },
    cerrarOrden() {
      this.OrdenService.closeOrder(this.order.id).then((data) => {
        console.log(data);
        this.cerrarOrdenDialog = false;
        Swal.fire({
          icon: 'success',
          title: `Se cerro correctamente la orden`,
          showConfirmButton: false,
          timer: 1500,
        })

        setTimeout(() => {
          this.$router.go();
        }, 1500);
      });
    },
    CargaPesajeFinal() {

      this.OrdenService.sendFinalWeight(this.order.id, this.pesajeFinal).then((data) => {
        console.log(data);
        this.pesajeFinalDialog = false;
        Swal.fire({
          icon: 'success',
          title: `Se añadio correctamente el peso final`,
          showConfirmButton: false,
          timer: 1500,
        })

        setTimeout(() => {
          this.$router.go();
        }, 1500);
      });

    },
    generarAlertaDialog(orden) {
      this.alertDialog = true;
      this.order = orden;
    },
    generarAlerta(confirmacion) {
      this.alerta.orden = this.order;
      console.log("alerta", this.alerta);
      this.AlertaService.create(this.alerta).then((data) => {
        console.log(data);
        this.generarAlerta = false;

        if (confirmacion) {
          Swal.fire({
            icon: 'success',
            title: `Se genero correctamente la alerta`,
            showConfirmButton: false,
            timer: 1500,
          })

        }
      }).catch((error) => {

        setTimeout(() => {
          this.$router.go();
        }, 1500);

        console.log(error);
      });
    },
    cargarDetalle() {
      this.detalle.orden.id = this.selectedProducts[0].id;
      this.DetalleService.create(this.detalle, this.order.password).then((data) => {
        console.log(data);
        this.order = this.orders.filter(data => data.id == this.order.id)[0]
        this.OrdenService.get(this.order.id, this.order.numeroOrden).then(data => {
          this.order = data

          console.log("ESTOY EN EL SERVICIO DE ORDEN");
          console.log(this.order);
          localStorage.setItem("order", JSON.stringify(this.order));
          if (this.order.notificacion == 0) {
            this.alertaMailDialog = true;
          }
        }).catch();
      }).catch((error) => {
        console.log(error);
      });
    },
    addConciliation(conciliacion) {
      Swal.fire({
        icon: 'success',
        title: `Se añadió exitosamente la conciliación`,
        showConfirmButton: false,
        timer: 1500,
      })

      setTimeout(() => {
        this.OrdenService.getConciliation(conciliacion.id)
          .then(data => {
            this.conciliacionObjeto = localStorage.setItem('conciliacion', JSON.stringify(data));
            this.$router.push('/conciliacion')
          })
      }, 1500);


    },
    agregaDetalleDialog(){
      this.agregaDetalleDialogProp = true;
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

@media (max-width: 800px) and (min-width: 400px) {
  input {
    height: 60px;
    text-align: center;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -ms-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
  }

  button {
    width: 50%;
    height: 10%;
    margin-left: 24.5%;
    margin-top: 15%;
  }

  select {
    height: 70px;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -ms-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
    font-size: 22px;
  }

  ::-webkit-input-placeholder {
    font-size: 22px;
  }

}

@media (max-width: 1440px) and (min-width: 801px) {
  input {
    height: 50px;
    text-align: center;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -ms-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
  }

  button {
    width: 35%;
    height: 10%;
    margin-left: 32.5%;
    margin-top: 15%;
  }

  select {
    height: 50px;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -ms-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
    font-size: 18px;
  }

  ::-webkit-input-placeholder {
    font-size: 18px;
  }
}

@media (min-width: 1441px) {
  input {
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -ms-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
  }
}
</style>
