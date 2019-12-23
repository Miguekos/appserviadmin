<template>
  <q-page padding>
    <q-card class="my-card">
      <q-item class="bg-custom4">
        <q-item-section>
          <q-item-label>Crear Proveedor</q-item-label>
          <q-item-label caption>Mentenimiento</q-item-label>
        </q-item-section>
        <q-item-section></q-item-section>
        <q-item-section></q-item-section>
        <q-item-section>
          <Atras />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-form
            @submit.prevent="registrar"
            @reset="onReset"
            class="q-gutter-md"
          >
            <q-select
              dense
              autofocus
              v-model="tipoDePersonaVar"
              :options="tipoDePersonaOption"
              option-value="co_tipper"
              option-label="no_tipper"
              emit-value
              map-options
              label="Tipo de Persona"
              outlined
            />

            <q-select
              dense
              v-model="tipoDeDocumentoVar"
              :options="tipoDeDocumentoOption"
              option-value="ti_docide"
              option-label="no_tipdoc"
              emit-value
              map-options
              label="Tipo de Documento"
              outlined
            />

            <q-select
              dense
              v-model="listar_sector_economicoVar"
              :options="listar_sector_economicoOption"
              option-value="co_sececo"
              option-label="no_sececo"
              emit-value
              map-options
              label="Sector Economico"
              outlined
            />

            <q-input
              dense
              required="true"
              outlined
              maxlength="11"
              v-model="numDocumento"
              label="Nro. de Documento"
            />

            <q-input
              dense
              required="true"
              outlined
              v-model="SiglaProveedor"
              label="Sigla Proveedor"
            />

            <q-input
              dense
              required="true"
              outlined
              v-model="nombre"
              label="Nombre"
            />

            <div class="text-center">
              <q-btn
                size="sm"
                label="Registrar"
                type="submit"
                color="primary"
              />
              <q-btn
                size="sm"
                label="Resetear"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-item-section>
      </q-item>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      tipoDePersonaOption: [],
      tipoDeDocumentoOption: [],
      listar_sector_economicoOption: [],
      tipoDePersonaVar: null,
      tipoDeDocumentoVar: null,
      listar_sector_economicoVar: null,
      numDocumento: "",
      SiglaProveedor: "",
      nombre: ""
    };
  },
  components: {
    Atras: () => import("../../components/IrAtras")
  },
  methods: {
    ...mapActions("proveedor", [
      "registrarProveedor",
      "listar_sector_economico"
    ]),
    ...mapActions("clientes", ["tipoDePersona", "TipoDeDocumento"]),
    registrar() {
      const data = {
        tipoPersona: this.tipoDePersonaVar,
        tipoDocumento: this.tipoDeDocumentoVar,
        codigoSectorEconomico: this.listar_sector_economicoVar,
        numeroDocumento: this.numDocumento,
        siglaProveedor: this.SiglaProveedor,
        razonSocial: this.nombre
      };
      console.log(data);
      this.registrarProveedor(data)
        .then(resp => {
          console.log(resp);
          this.$q.notify({
            color: "positive",
            message: "Proveedor registrado correctamente.!",
            textColor: "white"
          });
          this.$router.push("/proveedores");
        })
        .catch(err => {
          console.log(err);
          this.$q.notify({
            color: "negative",
            message: "Error al intentar registrar proveedor.!",
            textColor: "white"
          });
        });
    },
    onReset() {
      this.tipoDePersonaVar = null;
      this.tipoDeDocumentoVar = null;
      this.listar_sector_economicoVar = null;
      this.numDocumento = "";
      this.SiglaProveedor = "";
      this.nombre = "";
    }
  },
  async mounted() {
    this.tipoDePersonaOption = await this.tipoDePersona();
    this.tipoDeDocumentoOption = await this.TipoDeDocumento();
    this.listar_sector_economicoOption = await this.listar_sector_economico();
  }
};
</script>
