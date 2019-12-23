<template>
  <div>
    <q-card>
      <div class="row">
        <q-item class="col-sm-6 col-xs-12">
          <!--          {{ cliente }}-->
          <!--          {{ contacto }}-->
          <RegistroCitas
            :clienteR="cliente"
            :contactoR="contacto"
            :direcciones="getlistar_direccion"
          />
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <ListarCitas :info="getlistar_citas" />
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
      "getlistar_citas",
      "getlistar_direccion"
    ])
  },
  data: () => ({
    alert: false
  }),
  methods: {
    ...mapActions("example", [
      "dialogCreate",
      "listar_citas",
      "listar_direccion"
    ]),
    nuevoRegistro() {
      console.log("Se preciono el boton");
      this.dialogCreate(true);
      // this.$router.push("/cotizacion/create");
    }
  },
  components: {
    // TablaListado: () => import("./popLlamadaLista"),
    RegistroCitas: () => import("./registrarCita/Registro"),
    ListarCitas: () => import("./registrarCita/Lista")
    // AddRegistro: () => import("./Create")
  },
  async mounted() {
    console.log(this.cliente);
    console.log(this.contacto);
    await this.listar_citas({
      cliente: this.cliente,
      contacto: this.contacto
    });
    await this.listar_direccion({
      cliente: this.cliente,
      contacto: this.contacto
    });
  }
  // name: 'PageName',
};
</script>

<style></style>
