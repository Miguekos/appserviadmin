<template>
  <div>
    <q-page padding>
      <q-card class="my-card">
        <q-item class="bg-custom4">
          <q-item-section>
            <q-item-label>Formulario</q-item-label>
            <q-item-label caption>Requerimientos</q-item-label>
          </q-item-section>
          <q-item-section></q-item-section>
          <q-item-section></q-item-section>
          <q-item-section>
            <q-btn
              size="10px"
              color="green"
              @click="nuevoRegistro()"
              q-btn--push
              label="Nuevo"
            />
          </q-item-section>
        </q-item>
        <div class="row full-width">
          <q-item class="col-sm-6 col-xs-12">
            <CuadroResumen />
          </q-item>
          <q-item class="col-sm-6 col-xs-12">
            <TablaFiltro />
          </q-item>
        </div>
        <TablaListado />
      </q-card>
    </q-page>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    // ...mapGetters("example", ["getDialogCrear"])
  },
  data: () => ({
    alert: false
  }),
  methods: {
    // ...mapActions("example", ["dialogCreate"]),
  },
  components: {
    // TablaListado: () => import("./TablaListado"),
    // TablaFiltro: () => import("./TablaFiltro"),
    // CuadroResumen: () => import("./CuadroResumen"),
    // AddRegistro: () => import("./Create")
  }
  // name: 'PageName',
};
</script>

<style></style>
