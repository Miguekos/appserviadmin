<template>
  <div>
    <q-page padding>
      <q-card class="my-card">
        <q-item class="bg-custom4">
          <q-item-section>
            <q-item-label>Seguimiento de Cliente</q-item-label>
            <q-item-label caption>Control</q-item-label>
          </q-item-section>
          <q-item-section></q-item-section>
          <q-item-section></q-item-section>
          <q-item-section>
            <Atras />
          </q-item-section>
        </q-item>
        <div class="row full-width">
          <q-item class="col-sm-6 col-xs-12">
            <TablaFiltro />
          </q-item>
          <q-item class="col-sm-6 col-xs-12">
            <CuadroResumen />
          </q-item>
        </div>
        <TablaListado />
      </q-card>
    </q-page>
    <!--    <q-dialog full-height full-width v-model="getDialogCrear">-->
    <!--      <q-card class="full-height full-width">-->
    <!--        <q-card-section>-->
    <!--          <AddRegistro />-->
    <!--        </q-card-section>-->
    <!--      </q-card>-->
    <!--    </q-dialog>-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("example", ["getDialogCrear"])
  },
  data: () => ({
    alert: false
  }),
  methods: {
    ...mapActions("example", ["dialogCreate"]),
    nuevoRegistro() {
      console.log("Se preciono el boton");
      this.dialogCreate(true);
      // this.$router.push("/cotizacion/create");
    }
  },
  components: {
    TablaListado: () => import("./TablaListado"),
    TablaFiltro: () => import("./TablaFiltro"),
    CuadroResumen: () => import("./CuadroResumen"),
    Atras: () => import("../../components/IrAtras")
    // AddRegistro: () => import("./Create")
  }
  // name: 'PageName',
};
</script>

<style>
q-btn {
}
</style>
