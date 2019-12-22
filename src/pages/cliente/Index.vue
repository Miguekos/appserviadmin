<template>
  <q-page padding>
    <q-card class="my-card">
      <q-item class="bg-custom4">
        <q-item-section>
          <q-item-label>Clientes</q-item-label>
          <q-item-label caption>Lista</q-item-label>
        </q-item-section>
        <q-item-section></q-item-section>
        <q-item-section></q-item-section>
        <q-item-section>
          <Atras />
        </q-item-section>
      </q-item>
      <ListarCliente />
    </q-card>
  </q-page>
</template>

<script>
export default {
  components: {
    ListarCliente: () => import("./ListarCliente"),
    Atras: () => import("../../components/atras")
    // TablaFiltro: () => import("./TablaFiltro"),
    // CuadroResumen: () => import("./CuadroResumen")
  },
  methods: {
    atras() {
      console.log("Ir Atras");
      this.$router.go(-1);
    }
  }
  // name: 'PageName',
};
</script>

<style></style>
