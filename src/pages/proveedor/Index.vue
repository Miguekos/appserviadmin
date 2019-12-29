<template>
  <q-page padding>
    <q-card class="my-card">
      <q-item class="bg-custom4">
        <q-item-section>
          <q-item-label>Proveedores</q-item-label>
          <q-item-label caption>Mentenimiento</q-item-label>
        </q-item-section>
        <q-item-section></q-item-section>
        <q-item-section></q-item-section>
        <q-item-section>
          <div class="text-right">
            <Atras />
          </div>
        </q-item-section>
      </q-item>
      <div class="row full-width">
        <q-item class="col-sm-12 col-xs-12">
          <ListarProveedores />
        </q-item>
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  components: {
    ListarProveedores: () => import("./ListarProveedores"),
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
