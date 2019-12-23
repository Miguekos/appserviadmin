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
      <div class="row full-width">
        <q-item class="col-sm-12 col-xs-12">
          <ListarCliente />
        </q-item>
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  components: {
    ListarCliente: () => import("./ListarCliente"),
    Atras: () => import("../../components/IrAtras")
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
