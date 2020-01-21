<template>
  <div>
    <q-page padding>
      <q-card class="my-card">
        <q-item class="shadow-5 bg-secondary text-white">
          <q-item-section>
            <q-item-label style="font-size: 20px">
              MANTENIMIENTO DE VENTAS
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <div class="text-right">
              <Atras />
            </div>
          </q-item-section>
        </q-item>
        <div class="row full-width">
          <q-item class="col-sm-12 col-xs-12">
            <Catalogo />
          </q-item>
        </div>
        <div class="row full-width">
          <q-item class="col-sm-12 col-xs-12">
            <ListarCatalogo />
          </q-item>
        </div>
      </q-card>
    </q-page>
  </div>
</template>

<script>
export default {
  components: {
    Catalogo: () => import("./Catalogo"),
    ListarCatalogo: () => import("./ListarCatalogo"),
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
