<template>
  <q-page padding>
    <q-card class="my-card">
      <q-item class="bg-custom4">
        <q-item-section>
          <q-item-label>Crear Usuario</q-item-label>
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
              ref="password"
              filled
              v-model="password"
              label="Password"
              hint="Contraseña"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) || 'el campo no puede estar vacio'
              ]"
            />

            <q-select
              ref="rol"
              filled
              emit-value
              map-options
              transition-show="flip-up"
              transition-hide="flip-down"
              v-model="rol"
              label="Rol"
              hint="Rol"
              lazy-rules
              :rules="[val => val || 'el campo no puede estar vacio']"
              :options="roles"
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
      password: null,
      rol: null,
      porcent: null,
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
    ...mapActions("users", ["createUsers"]),
    registrar() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.rol
      };
      console.log(data);
      return this.createUsers(data);
    },
    onSubmit() {
      this.$refs.name.validate();
      this.$refs.email.validate();
      this.$refs.password.validate();
      this.$refs.rol.validate();

      if (
        this.$refs.name.hasError ||
        this.$refs.email.hasError ||
        this.$refs.password.hasError ||
        this.$refs.rol.hasError
      ) {
        this.formHasError = true;
      } else {
        const response = this.registrar();
        if (response) {
          this.$q.notify({
            icon: "done",
            color: "secondary",
            message: "Registrado"
          });
          this.onReset();
          this.$router.push("/user");
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
      this.email = null;
      this.password = null;
      this.rol = null;

      this.$refs.name.resetValidation();
      this.$refs.email.resetValidation();
      this.$refs.password.resetValidation();
      this.$refs.rol.resetValidation();
    }
  }
};
</script>
