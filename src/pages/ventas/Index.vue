<template>
  <div>
    <q-page padding>
      <q-card class="my-card">
        <q-item class="shadow-5 bg-secondary text-white  ">
          <q-item-section>
            <q-item-label style="font-size: 20px">
              SEGUIMIENTO DE CLIENTE
            </q-item-label>
            <!--            <q-item-label caption>SEGUIMIENTO</q-item-label>-->
          </q-item-section>
          <q-item-section>
            <div class="text-right">
              <Atras />
            </div>
          </q-item-section>
        </q-item>
        <div class="row full-width">
          <q-item class="col-sm-3 col-xs-12">
            <TablaFiltro />
          </q-item>
          <q-item class="col-sm-3 col-xs-12">
            <CuadroResumen />
          </q-item>
          <q-item class="col-sm-6 col-xs-12">
            <Leyenda />
          </q-item>
        </div>
        <TablaListado />
      </q-card>
    </q-page>
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
    Leyenda: () => import("./Leyenda"),
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
