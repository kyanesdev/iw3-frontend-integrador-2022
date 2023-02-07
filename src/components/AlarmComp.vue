<template>
  <Dialog header="Aviso de alarma" v-model:visible="display" :breakpoints="{'960px': '75vw', '640px': '100vw'}">
	Se activó la alarma de temperatura,
  presione confirmar para dejar asentado su conocimiento
  <template #footer>
        <Button label="Confirmar" autofocus @click="closeDialog"/>
    </template>
</Dialog>
</template>

<script>
import AlertaService from '@/services/alerta/AlertaService';
export default{
  data(){
    return {
      display: true,
    }
  },
  methods: {
    closeDialog(){
      this.display = false;
    },
    alarmRequest(){
      AlertaService.getAll();
    }
  }
}
</script>

<style lang="scss" scoped>
</style>