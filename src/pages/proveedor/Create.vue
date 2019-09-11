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
      name: null,
      email: null,
      dni: null,
      telf: null,
      direccion: null,
      model: null,
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
    ...mapActions("clientes", ["createCleintes"]),
    registrar() {
      const data = {
        name: this.name,
        dni: this.dni,
        email: this.email,
        telf: this.telf,
        direccion: this.direccion
      };
      console.log(data);
      return this.createCleintes(data);
    },
    onSubmit() {
      this.$refs.name.validate();
      this.$refs.dni.validate();
      this.$refs.email.validate();

      if (
        this.$refs.name.hasError ||
        this.$refs.dni.hasError ||
        this.$refs.email.hasError
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
          this.$router.push("/cliente");
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
      this.name = null;
      this.dni = null;
      this.email = null;

      this.$refs.name.resetValidation();
      this.$refs.dni.resetValidation();
      this.$refs.email.resetValidation();
    }
  }
};
</script>
