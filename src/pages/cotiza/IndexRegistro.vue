<template>
  <q-page padding>
    <q-card class="my-card">
      <q-item class="bg-custom4">
        <q-item-section>
          <q-item-label>Cotizacion</q-item-label>
          <q-item-label caption>Requerimientos</q-item-label>
        </q-item-section>
        <q-item-section> </q-item-section>
        <q-item-section> </q-item-section>
        <q-item-section>
          <q-btn
            size="10px"
            color="green"
            @click="nuevoRegistro()"
            label="Nuevo Requerimiento"
          />
        </q-item-section>
      </q-item>
      <div class="row full-width">
        <q-item class="col-sm-6">
          <TablaFiltro />
        </q-item>
        <q-item class="col-sm-6">
          <CuadroResumen />
        </q-item>
      </div>
      <TablaListado />
    </q-card>
  </q-page>
</template>

<script>
export default {
  methods: {
    nuevoRegistro() {
      console.log("Se preciono el boton");
      this.$router.push("/cotizacion/create");
    }
  },
  components: {
    TablaListado: () => import("./TablaListado"),
    TablaFiltro: () => import("./TablaFiltro"),
    CuadroResumen: () => import("./CuadroResumen")
  }
  // name: 'PageName',
};
</script>

<style></style>
