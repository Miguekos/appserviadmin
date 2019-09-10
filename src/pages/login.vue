<template>
  <div>
    <div class="q-pa-md fixed-center" style="width: 350px;">
      <div class="q-pa-md shadow-2 rounded-borders">
        <q-card class="q-pa-md shadow-2 rounded-borders">
          <!--          <div class="text-h6 text-center">Iniciar Session</div>-->
          <div class="q-pa-md flex-center flex">
            <div>
              <!-- <q-img src="/statics/01.png" style="width: 180px"></q-img> -->
              <img
                class="float-left"
                spinner-color="white"
                sizes="30px"
                src="/statics/01.png"
              />
            </div>
          </div>
          <form v-on:submit="onSubmit()" class="shadow-2 rounded-borders">
            <div class="q-pa-md">
              <div class="text-left">
                <q-input
                  id="username"
                  type="text"
                  v-model.trim="form.username"
                  label="Email"
                  required
                  autofocus
                />
                <q-input
                  id="password"
                  type="password"
                  v-model="form.password"
                  label="Password"
                  required
                />
              </div>
            </div>
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
      drawerState: false,
      rememberMe: true,
      form: {
        username: "admin@admin.com",
        password: "secret"
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
      const validar = response[0];
      console.log(validar);
      if (validar) {
        console.log("entro en validar");
        this.$q.notify({
          message: `Wellcome: ${validar.name}`,
          color: "green"
        });
        console.log(validar);
        localStorage.setItem("jwt", true);
        localStorage.setItem("datadelusuario", JSON.stringify(validar));
        this.$q.cookies.set("accToken", "cookie_value");
        this.$router.push("/");
        // this.$router.push({ name: "HelloWorld" });
      } else {
        this.$q.notify({
          message: "validar",
          color: "red"
        });
      }
      // this.login()
    }
  },
  async mounted() {}
};
</script>
