<template>
  <q-page padding>
    <q-card class="my-card">
      <q-item class="bg-custom4">
        <q-item-section>
          <q-item-label>Dashboard</q-item-label>
          <q-item-label caption>Metricas / Estadisticas</q-item-label>
        </q-item-section>
      </q-item>
      <div class="row justify-around col-xs-12">
        <div class="q-pa-sm col-xs-12 col-sm-6">
          <Grafica1 />
        </div>
        <div class="q-pa-sm col-xs-12 col-sm-6">
          <Grafica2 />
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  components: {
    Grafica1: () => import("./chartjs/ChartContainer"),
    Grafica2: () => import("./chartjs/ChartContainer")
  }
  // name: 'PageName',
};
</script>

<style></style>
