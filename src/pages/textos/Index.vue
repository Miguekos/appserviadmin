<template>
  <div>
    <q-page padding>
      <q-card class="my-card">
        <q-item class="shadow-5 bg-secondary text-white">
          <q-item-section>
            <q-item-label style="font-size: 20px">
              MANTENIMIENTO DE TEXTOS
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <div class="text-right">
              <Atras />
            </div>
          </q-item-section>
        </q-item>

        <q-item class="full-width">
          <Catalogo />
        </q-item>

        <q-item class="full-width">
          <ListarCatalogo />
        </q-item>
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
