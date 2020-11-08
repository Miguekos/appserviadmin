<template>
  <div class="row q-gutter-md justify-around items-center">
    <div class="col" v-if="cerrar">
      <envioDeCatalogos />
      <div class="text-center q-pt-md">
        <q-btn v-close-popup color="red" label="Cerrar" />
      </div>
    </div>
    <div class="col" v-if="cerrar">
      <Destinatarios @click="boton" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cerrar: true
    };
  },
  methods: {
    boton() {
      this.cerrar = false;
    }
  },
  components: {
    envioDeCatalogos: () => import("./envioCatalogo"),
    Destinatarios: () => import("./destinatarios")
  }
};
</script>

<style scoped></style>
