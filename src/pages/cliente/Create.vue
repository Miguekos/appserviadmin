<template>
  <q-page padding>
    <q-card class="my-card">
      <q-item class="bg-custom4">
        <q-item-section>
          <q-item-label>Crear</q-item-label>
          <q-item-label caption>Cliente</q-item-label>
        </q-item-section>
        <q-item-section></q-item-section>
        <q-item-section></q-item-section>
        <q-item-section>
          <Atras />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <form
            @submit.prevent="registrar"
            @reset.prevent="onReset"
            class="q-gutter-sm"
          >
            <q-select
              dense
              v-model="tipoDePersonaVar"
              :options="tipoDePersonaOption"
              option-value="co_tipper"
              option-label="no_tipper"
              emit-value
              map-options
              label="Tipo de Persona"
              outlined
              required="true"
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

            <q-input
              dense
              ref="numeroDeDocumento"
              outlined
              v-model="numeroDeDocumento"
              label="Numero de Documento"
              maxlength="11"
              required
            />

            <q-input
              dense
              ref="nombre"
              outlined
              v-model="nombre"
              label="Nombre"
              required
            />

            <q-input
              dense
              ref="sigla"
              outlined
              v-model="sigla"
              label="Sigla"
              required
            />

            <div class="text-center">
              <q-btn
                glossy
                size="sm"
                label="Registrar"
                type="submit"
                color="primary"
              />
              <q-btn
                glossy
                size="sm"
                label="Resetear"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </form>
        </q-item-section>
      </q-item>
    </q-card>
    <!-- {{ tipoDeDocumentoOption }} -->
    <!-- {{ tipoDePersonaVar }} -->
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      tipoDePersonaOption: [],
      tipoDeDocumentoOption: [],
      tipoDePersonaVar: null,
      tipoDeDocumentoVar: null,
      numeroDeDocumento: "",
      name: null,
      email: null,
      nombre: "",
      generoPersona: null,
      estadoCivil: null,
      documentoTributario: null,
      telf: null,
      direccion: null,
      model: null,
      sigla: "",
      roles: [
        {
          label: "Admin",
          value: 1
        },
        {
          label: "Usuario",
          value: 2
        }
      ]
    };
  },
  components: {
    Atras: () => import("../../components/atras")
  },
  methods: {
    ...mapActions("clientes", [
      "createCleintes",
      "tipoDePersona",
      "TipoDeDocumento"
    ]),
    atras() {
      console.log("Ir Atras");
      this.$router.go(-1);
    },
    registrar() {
      const data = {
        tipoPersona: this.tipoDePersonaVar,
        tipoDocumento: this.tipoDeDocumentoVar,
        numeroDocumento: this.numeroDeDocumento,
        razonSocial: this.nombre,
        siglaCliente: this.sigla
      };
      console.log(data);
      this.createCleintes(data)
        .then(resp => {
          console.log(resp);
          this.$q.notify({
            color: "green",
            textColor: "white",
            icon: "fas fa-check-circle",
            message: "Registrado"
          });
          this.$router.push("/cliente");
        })
        .catch(err => {
          console.log(err);
          this.$q.notify({
            color: "red",
            textColor: "white",
            icon: "fas fa-times",
            message: "Error al registrar.!"
          });
        });
    },
    onSubmit() {
      const response = this.registrar();
      console.log(response);
    },
    onReset() {
      this.tipoDePersonaVar = "";
      this.tipoDeDocumentoVar = "";
      this.numeroDeDocumento = "";
      this.nombre = "";
      this.sigla = "";
      //   this.$refs.name.resetValidation();
      //   this.$refs.dni.resetValidation();
      //   this.$refs.email.resetValidation();
      //   this.$refs.telf.resetValidation();
      //   this.$refs.direccion.resetValidation();
    }
  },
  async created() {
    this.tipoDePersonaOption = await this.tipoDePersona();
    this.tipoDeDocumentoOption = await this.TipoDeDocumento();
  }
};
</script>
