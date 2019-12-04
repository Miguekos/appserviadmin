<template>
  <div>
    <q-page padding>
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
    // TablaListado: () => import("./popLlamadaLista"),
    TablaFiltro: () => import("./registrarCita/Registro"),
    CuadroResumen: () => import("./registrarCita/Lista")
    // AddRegistro: () => import("./Create")
  }
  // name: 'PageName',
};
</script>

<style></style>
