<template>
  <q-page padding>
    <q-card class="my-card">
      <q-item class="bg-custom4">
        <q-item-section>
          <q-item-label>Usuarios</q-item-label>
          <q-item-label caption>Mentenimiento</q-item-label>
        </q-item-section>
      </q-item>
      <ListarUsers />
    </q-card>
  </q-page>
</template>

<script>
export default {
  components: {
    ListarUsers: () => import("./ListarUsers")
    // TablaFiltro: () => import("./TablaFiltro"),
    // CuadroResumen: () => import("./CuadroResumen")
  }
  // name: 'PageName',
};
</script>

<style></style>
