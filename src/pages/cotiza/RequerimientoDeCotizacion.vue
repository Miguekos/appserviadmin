<template>
  <div>
    <q-page padding>
      <q-card class="my-card">
        <q-item class="bg-custom4">
          <q-item-section>
            <q-item-label>Requerimiento</q-item-label>
            <q-item-label caption>Cotizacion</q-item-label>
          </q-item-section>
          <q-item-section></q-item-section>
          <q-item-section></q-item-section>
          <q-item-section>
            <q-btn
              size="10px"
              @click="nuevoRegistro()"
              q-btn--push
              label="Nuevo"
              text-color="white"
              style="background-color: #26a69a;"
            />
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
    <q-dialog full-height full-width v-model="getDialogCrear">
      <q-card class="full-height full-width">
        <q-card-section>
          <!--          <AddRegistro />-->
        </q-card-section>
        <!-- <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>-->
      </q-card>
    </q-dialog>
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
    TablaListado: () => import("./TablaListadoReque"),
    TablaFiltro: () => import("./TablaLeyendaReque"),
    CuadroResumen: () => import("./CuadroResumenReque")
    // AddRegistro: () => import("./Create")
  }
  // name: 'PageName',
};
</script>
