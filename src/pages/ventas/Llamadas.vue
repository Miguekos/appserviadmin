<template>
  <div>
    <q-card>
      <div class="row">
        <q-item class="col-sm-6 col-xs-12">
          <TablaFiltro />
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <CuadroResumen />
        </q-item>
      </div>
    </q-card>
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
    // TablaListado: () => import("./popLlamadaLista"),
    TablaFiltro: () => import("./llamadas/Registro"),
    CuadroResumen: () => import("./llamadas/Lista")
    // AddRegistro: () => import("./Create")
  }
  // name: 'PageName',
};
</script>

<style></style>
