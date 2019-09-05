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
              ref="name"
              filled
              v-model="name"
              label="Nombres"
              hint="Nombre completo"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) || 'el campo no puede estar vacio'
              ]"
            />

            <q-input
              ref="dni"
              filled
              v-model="dni"
              label="DNI"
              hint="DNI / C.E"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) || 'el campo no puede estar vacio'
              ]"
            />

            <q-input
              ref="email"
              filled
              type="email"
              v-model="email"
              label="Email"
              hint="Correo electronico"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) || 'el campo no puede estar vacio'
              ]"
            />

            <q-input
              ref="telf"
              filled
              type="telf"
              v-model="telf"
              label="Telefono"
              hint="Telf."
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) || 'el campo no puede estar vacio'
              ]"
            />

            <q-input
              ref="direccion"
              filled
              type="direccion"
              v-model="direccion"
              label="Direccion"
              hint="Direccion"
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
      this.$refs.telf.validate();
      this.$refs.direccion.validate();

      if (
        this.$refs.name.hasError ||
        this.$refs.dni.hasError ||
        this.$refs.email.hasError ||
        this.$refs.telf.hasError ||
        this.$refs.direccion.hasError
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
      this.telf = null;
      this.direccion = null;

      this.$refs.name.resetValidation();
      this.$refs.dni.resetValidation();
      this.$refs.email.resetValidation();
      this.$refs.telf.resetValidation();
      this.$refs.direccion.resetValidation();
    }
  }
};
</script>
