<template>
  <div class="row q-gutter-md justify-around items-center">
    <div class="col">
      <envioDeCatalogos />
      <div class="text-center q-pt-md">
        <q-btn v-close-popup color="red" label="Cerrar" />
      </div>
    </div>
    <div class="col">
      <destinatarios />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {
    envioDeCatalogos: () => import("./envioCatalogo"),
    destinatarios: () => import("./destinatarios")
  }
};
</script>

<style scoped></style>
