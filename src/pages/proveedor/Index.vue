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
          <q-btn
            size="sm"
            @click="atras()"
            q-btn-push
            label="Atras"
            text-color="white"
            color="grey"
          />
        </q-item-section>
      </q-item>
      <ListarProveedores />
    </q-card>
  </q-page>
</template>

<script>
export default {
  components: {
    ListarProveedores: () => import("./ListarProveedores")
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
