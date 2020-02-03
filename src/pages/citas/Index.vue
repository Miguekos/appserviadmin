<template>
  <div>
    <q-page padding>
      <q-card class="my-card">
        <TituloTablas titulo="AGENDAS DE CITAS" />
        <TablaListado />
        <TablaListadoHistorico />
      </q-card>
    </q-page>
    <q-dialog v-model="getDialogCrear">
      <q-card>
        <AddRegistro />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TituloTablas from "../../components/TituloTablas";
export default {
  computed: {
    ...mapGetters("example", ["getDialogCrear"])
  },
  data: () => ({
    alert: false
  }),
  methods: {
    ...mapActions("example", ["dialogCreate"]),
    atras() {
      console.log("Ir Atras");
      this.$router.go(-1);
    }
  },
  components: {
    TituloTablas,
    TablaListado: () => import("./TablaListado"),
    TablaListadoHistorico: () => import("./TablaListadoHistorico")
    // TablaFiltro: () => import("./TablaFiltro"),
    // CuadroResumen: () => import("./CuadroResumen"),
    // AddRegistro: () => import("./Create")
    // Atras: () => import("../../components/IrAtras")
  }
  // name: 'PageName',
};
</script>

<style></style>
