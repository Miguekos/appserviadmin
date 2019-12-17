<template>
  <q-page padding>
    <q-card class="my-card">
      <q-item class="bg-custom4">
        <q-item-section>
          <q-item-label>Crear Cliente</q-item-label>
          <q-item-label caption>Mentenimiento</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <form
            @submit.prevent.stop="onSubmit"
            @reset.prevent.stop="onReset"
            class="q-gutter-md"
          >
            <q-select
              v-model="tipoDePersonaVar"
              :options="tipoDePersonaOption"
              option-value="co_tipper"
              option-label="no_tipper"
              emit-value
              map-options
              label="Tipo de Persona"
              filled
            />

            <q-select
              v-model="tipoDeDocumentoVar"
              :options="tipoDeDocumentoOption"
              option-value="ti_docide"
              option-label="no_tipdoc"
              emit-value
              map-options
              label="Tipo de Documento"
              filled
            />

            <q-input
              ref="numeroDeDocumento"
              filled
              v-model="numeroDeDocumento"
              label="Numero de Documento"
              hint="Numero de Documento"
              maxlength="11"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) || 'el campo no puede estar vacio'
              ]"
            />

            <q-input
              ref="nombre"
              filled
              v-model="nombre"
              label="Nombre"
              hint="Nombre"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) || 'el campo no puede estar vacio'
              ]"
            />

            <q-input
              ref="sigla"
              filled
              v-model="sigla"
              label="Sigla"
              hint="Sigla"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) || 'el campo no puede estar vacio'
              ]"
            />

            <div>
              <q-btn label="Registrar" type="submit" color="primary" />
              <q-btn
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
  methods: {
    ...mapActions("clientes", [
      "createCleintes",
      "tipoDePersona",
      "TipoDeDocumento"
    ]),
    registrar() {
      const data = {
        tipoPersona: this.tipoDePersonaVar,
        tipoDocumento: this.tipoDeDocumentoVar,
        numeroDocumento: this.numeroDeDocumento,
        razonSocial: this.nombre,
        siglaCliente: this.sigla
      };
      console.log(data);
      return this.createCleintes(data);
    },
    onSubmit() {
      const response = this.registrar();
      console.log(response);
    },

    onReset() {
      this.name = null;
      this.dni = null;
      this.email = null;
      this.telf = null;
      this.direccion = null;

      this.$refs.name.resetValidation();
      this.$refs.dni.resetValidation();
      this.$refs.email.resetValidation();
      this.$refs.telf.resetValidation();
      this.$refs.direccion.resetValidation();
    }
  },
  async created() {
    this.tipoDePersonaOption = await this.tipoDePersona();
    this.tipoDeDocumentoOption = await this.TipoDeDocumento();
  }
};
</script>
