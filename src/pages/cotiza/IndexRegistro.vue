<template>
  <q-page padding>
    <q-card class="my-card">
      <q-item class="bg-custom4">
        <q-item-section>
          <q-item-label>Cotizacion</q-item-label>
          <q-item-label caption>Requerimientos</q-item-label>
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
  components: {
    TablaListado: () => import("./NuevaTabla"),
    TablaFiltro: () => import("./TablaFiltro"),
    CuadroResumen: () => import("./CuadroResumen")
  }
  // name: 'PageName',
};
</script>

<style></style>
