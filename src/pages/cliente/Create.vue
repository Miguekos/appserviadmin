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
              ref="generoPersona"
              filled
              v-model="generoPersona"
              label="Genero"
              hint="Genero"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) || 'el campo no puede estar vacio'
              ]"
            />

            <q-input
              ref="estadoCivil"
              filled
              v-model="estadoCivil"
              label="Estado Civil"
              hint="Estado Civil"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) || 'el campo no puede estar vacio'
              ]"
            />

            <q-input
              ref="documentoTributario"
              filled
              v-model="documentoTributario"
              label="RUC"
              hint="RUC"
              maxlength="11"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) || 'el campo no puede estar vacio'
              ]"
            />

            <!--            <q-input-->
            <!--              ref="direccion"-->
            <!--              filled-->
            <!--              type="direccion"-->
            <!--              v-model="direccion"-->
            <!--              label="Direccion"-->
            <!--              hint="Direccion"-->
            <!--              lazy-rules-->
            <!--              :rules="[-->
            <!--                val =>-->
            <!--                  (val && val.length > 0) || 'el campo no puede estar vacio'-->
            <!--              ]"-->
            <!--            />-->

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
      generoPersona: null,
      estadoCivil: null,
      documentoTributario: null,
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
      // const data = {
      //   name: this.name,
      //   dni: this.dni,
      //   email: this.email,
      //   telf: this.telf,
      //   direccion: this.direccion
      // };
      const data = {
        tipoPersona: "J",
        numeroDocumento: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        nombres: this.name,
        tipoDocumento: "1",
        codigoNacionalidad: "1",
        fechaNacimiento: "1990-10-10",
        generoPersona: this.generoPersona,
        estadoCivil: this.estadoCivil,
        documentoTributario: this.documentoTributario,
        razonSocial: "Razon Social",
        nombreComercial: "Siglas"
      };
      console.log(data);
      return this.createCleintes(data);
    },
    onSubmit() {
      const response = this.registrar();
      console.log(response);
      // this.$refs.name.validate();
      // this.$refs.dni.validate();
      // this.$refs.email.validate();
      // this.$refs.telf.validate();
      // this.$refs.direccion.validate();

      // if (
      //   this.$refs.name.hasError ||
      //   this.$refs.dni.hasError ||
      //   this.$refs.email.hasError ||
      //   this.$refs.telf.hasError ||
      //   this.$refs.direccion.hasError
      // ) {
      //   this.formHasError = true;
      // } else {
      //   const response = this.registrar();
      //   if (response) {
      //     this.$q.notify({
      //       icon: "done",
      //       color: "secondary",
      //       message: "Registrado"
      //     });
      //     this.onReset();
      //     this.$router.push("/cliente");
      //   } else {
      //     this.$q.notify({
      //       icon: "close",
      //       color: "red",
      //       message: "No se pudo guardar el usuario"
      //     });
      //   }
      // }
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
