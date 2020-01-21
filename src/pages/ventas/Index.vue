<template>
  <div>
    <q-page padding>
      <q-card class="my-card">
        <q-item class="shadow-5 bg-secondary text-white">
          <q-item-section>
            <q-item-label style="font-size: 20px">
              SEGUIMIENTO DE CLIENTES
            </q-item-label>
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
          <q-item class="col-sm-2 col-xs-12">
            <Leyenda2 />
          </q-item>
          <q-item class="col-sm-2 col-xs-12">
            <Leyenda1 />
          </q-item>
          <q-item class="col-sm-2 col-xs-12">
            <Leyenda3 />
          </q-item>
        </div>
        <div class="row full-width">
          <q-item class="col-sm-12 col-xs-12">
            <Leyenda4 />
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
    // Leyenda: () => import("./Leyenda"),
    Leyenda1: () => import("./Leyenda1"),
    Leyenda2: () => import("./Leyenda2"),
    Leyenda3: () => import("./Leyenda3"),
    Leyenda4: () => import("./Leyenda4"),
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
