<template>
  <div>
    <q-toolbar class="bg-custom1 text-white shadow-5">
      <q-btn flat label="ServiAdmin" />
      <q-space />
      <q-btn flat round dense icon="whatshot" />
    </q-toolbar>
    <div class="q-pa-md fixed-center" style="width: 400px;">
      <div class="q-pa-md">
        <q-toolbar class="shadow-2 rounded-borders">
          <q-separator vertical inset />
          <q-btn flat label="Inciar session" />
          <q-space />
        </q-toolbar>
      </div>
      <div class="q-pa-md">
        <q-card class="q-pa-md">
          <form v-on:submit="onSubmit()">
            <div class="">
              <div class="text-left">
                <img class="float-left" src="/statics/quasar-logo.png" />
                <q-input
                  id="username"
                  type="text"
                  v-model.trim="form.username"
                  label="User Name"
                  required
                  autofocus
                />
                <q-input
                  id="password"
                  type="password"
                  v-model="form.password"
                  label="Password"
                  required
                /><br />
              </div>
            </div>
            <q-separator />

            <q-card-actions>
              <q-btn type="submit" class="fit" color="positive">Login</q-btn>
            </q-card-actions>
          </form>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      drawerState: true,
      rememberMe: true,
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions("auth", ["login", "validarUser"]),
    async onSubmit() {
      // this.getCliente();
      const data = {
        email: this.form.username,
        password: this.form.password
      };
      // console.log(data);
      const response = await this.login(data);
      const validar = response.message;
      console.log(validar);
      if (validar == true) {
        const guardaruser = await this.validarUser();
        this.$q.notify({
          message: `Wellcome: ${guardaruser.name}`,
          color: "green"
        });
        console.log(guardaruser);
        localStorage.setItem("jwt", true);
        localStorage.setItem("datadelusuario", JSON.stringify(guardaruser));
        this.$q.cookies.set("accToken", "cookie_value");
        this.$router.push("/");
        // this.$router.push({ name: "HelloWorld" });
      } else {
        this.$q.notify({
          message: validar,
          color: "red"
        });
      }
      // this.login()
    }
  },
  async mounted() {}
};
</script>

<style lang="stylus" scoped></style>
