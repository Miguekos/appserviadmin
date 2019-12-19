<template>
  <div>
    <q-page padding>
      <q-card class="my-card">
        <q-item class="bg-custom4">
          <q-item-section>
            <q-item-label>Cotizacion</q-item-label>
            <q-item-label caption>Requerimientos</q-item-label>
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
    <q-dialog v-model="getDialogCrear">
      <q-card>
        <AddRegistro />
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
    atras() {
      console.log("Ir Atras");
      this.$router.go(-1);
    }
  },
  components: {
    TablaListado: () => import("./TablaListado"),
    TablaFiltro: () => import("./TablaFiltro"),
    CuadroResumen: () => import("./CuadroResumen"),
    AddRegistro: () => import("./Create")
  }
  // name: 'PageName',
};
</script>

<style></style>
