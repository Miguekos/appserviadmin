<template>
  <div>
    <q-card>
      <div class="row">
        <q-item class="col-sm-6 col-xs-12">
          <!--          {{ cliente }}-->
          <!--          {{ contacto }}-->
          <TablaRegistro :clienteR="cliente" :contactoR="contacto" />
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <ListaResultados :info="getlistar_seguimientos_registrados" />
        </q-item>
      </div>
    </q-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["cliente", "contacto"],
  computed: {
    ...mapGetters("example", [
      "getDialogCrear",
      "getlistar_seguimientos_registrados"
    ])
  },
  data: () => ({
    alert: false
  }),
  methods: {
    ...mapActions("example", [
      "dialogCreate",
      "listar_seguimientos_registrados"
    ]),
    nuevoRegistro() {
      console.log("Se preciono el boton");
      this.dialogCreate(true);
      // this.$router.push("/cotizacion/create");
    }
  },
  components: {
    // TablaListado: () => import("./popLlamadaLista"),
    TablaRegistro: () => import("./llamadas/Registro"),
    ListaResultados: () => import("./llamadas/Lista")
    // AddRegistro: () => import("./Create")
  },
  async mounted() {
    await this.listar_seguimientos_registrados({
      cliente: this.cliente,
      contacto: this.contacto
    });
  }
  // name: 'PageName',
};
</script>

<style></style>
