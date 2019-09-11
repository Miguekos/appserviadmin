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
            <q-input
              ref="razonSocial"
              filled
              v-model="razonSocial"
              label="Razon Social"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) || 'el campo no puede estar vacio'
              ]"
            />

            <q-input
              ref="ruc"
              filled
              v-model="ruc"
              label="Numero de Ruc"
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
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      razonSocial: null,
      ruc: null,
      sigla: null
    };
  },
  methods: {
    ...mapActions("proveedor", ["registrarProveedor"]),
    registrar() {
      const data = {
        no_provee: this.razonSocial,
        nu_docpro: this.ruc,
        nu_sigpro: this.sigla
      };
      console.log(data);
      return this.registrarProveedor(data);
    },
    onSubmit() {
      this.$refs.razonSocial.validate();
      this.$refs.ruc.validate();
      this.$refs.sigla.validate();

      if (
        this.$refs.razonSocial.hasError ||
        this.$refs.ruc.hasError ||
        this.$refs.sigla.hasError
      ) {
        this.formHasError = true;
      } else {
        const response = this.registrar();
        if (response) {
          this.$q.notify({
            icon: "done",
            color: "positive",
            message: "Registrado"
          });
          this.onReset();
          this.$router.push("/proveedores");
        } else {
          this.$q.notify({
            icon: "close",
            color: "red",
            message: "No se pudo guardar el usuario"
          });
        }
      }
    },

    onReset() {
      this.razonSocial = null;
      this.ruc = null;
      this.sigla = null;

      this.$refs.razonSocial.resetValidation();
      this.$refs.ruc.resetValidation();
      this.$refs.sigla.resetValidation();
    }
  }
};
</script>
