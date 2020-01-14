<template>
  <div>
    <!--    <q-layout view="hHh lpR fFf">-->
    <q-layout view="hHh LpR fFf">
      <q-header
        size="sm"
        dense
        elevated
        class="bg-white text-grey-8 q-py-xs"
        height-hint="58"
      >
        <q-toolbar>
          <!-- {{ $q.screen.gt.xs }} -->
          <q-btn
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
            icon="menu"
            color="green"
          />
          <q-toolbar-title
            class="cursor-pointer text-weight-bold"
            @click="URL('/')"
          >
            SJ Servi Admin
          </q-toolbar-title>
          <q-space />
          <div class="q-gutter-sm row items-center no-wrap">
            <q-btn round flat @click="showDialog">
              <q-avatar size="36px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
              <q-tooltip>Cuenta</q-tooltip>
            </q-btn>
            <q-btn round flat @click="URL('logout')">
              <q-avatar size="36px">
                <q-icon name="logout" />
              </q-avatar>
              <q-tooltip>Salir</q-tooltip>
            </q-btn>
          </div>
        </q-toolbar>
      </q-header>
      <!-- Aqui el panel lateral     -->
      <q-drawer v-model="leftDrawerOpen" content-class="bg-grey-2" :width="240">
        <q-scroll-area dense :thumb-style="thumbStyle" class="fit q-pa-sm">
          <!--<Menu />-->
          <Menu />
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </q-page-container>
    </q-layout>
    <q-dialog
      v-model="bar2"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <!-- <q-card class="bg-primary text-white"> -->
      <q-card>
        <q-bar>
          <div>{{ user.name }}</div>

          <q-space />

          <q-btn flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6"></div>
        </q-card-section>

        <q-card-section>
          <div class="row">
            <div class="col-xs-12 q-pb-lg">
              <q-uploader
                :factory="factoryFn"
                multiple
                style="max-width: 300px"
                name="file"
              />
            </div>
            <div class="col-xs-12">
              <div class="q-pa-xs col-xs-12">
                <q-input v-model="name" outlined stack-label label="Nombre" />
              </div>
              <div class="q-pa-xs">
                <q-input v-model="correo" outlined stack-label label="Correo" />
              </div>
              <div class="q-pa-xs">
                <q-input
                  v-model="newpassword"
                  outlined
                  stack-label
                  label="Nuevo Password"
                />
              </div>
            </div>
          </div>
          <div class="text-center">
            <q-btn
              color="secondary"
              text-color="white"
              label="Guardar"
              v-close-popup
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
// import { openURL } from 'quasar'
// import { date } from "quasar";
import { mapActions } from "vuex";
export default {
  computed: {
    contentStyle() {
      return {
        backgroundColor: "rgba(0,0,0,0.02)",
        color: "#555"
      };
    },
    contentActiveStyle() {
      return {
        backgroundColor: "#eee",
        color: "black"
      };
    },
    thumbStyle() {
      return {
        right: "2px",
        borderRadius: "5px",
        backgroundColor: "#43b1e3",
        width: "5px",
        opacity: 0.75
      };
    }
  },
  name: "MyLayout",
  data() {
    return {
      link: "",
      name: "",
      correo: "",
      newpassword: "",
      user: {},
      bar2: false,
      leftDrawerOpen: false,
      search: ""
    };
  },
  methods: {
    factoryFn(files) {
      console.log(files);
      return {
        url: "http://localhost:5000",
        method: "POST"
      };
      // console.log(files);
      // returning a Promise

      // return new Promise(resolve => {
      //   // simulating a delay of 2 seconds
      //   setTimeout(() => {
      //     resolve({
      //       url: "http://localhost:4444/upload"
      //     });
      //   }, 2000);
      // });
    },
    ...mapActions("auth", ["logout"]),
    showDialog() {
      const userlocal = JSON.parse(localStorage.getItem("datadelusuario"));
      this.user = userlocal;
      this.name = userlocal.name;
      this.correo = userlocal.email;
      this.bar2 = true;
    },
    async URL(arg) {
      if (arg == "logout") {
        console.log("Entro en el deslogueo");
        this.logout();
        this.$q.notify({
          message: "Session Cerrada",
          color: "red"
        });
        await this.$router.push("/login");
      } else {
        this.link = arg;
        console.log(arg);
        await this.$router.push(arg);
      }
    },
    getUrl(files) {
      return `http://localhost:4444/upload?count=${files.length}`;
    }
  },
  components: {
    Menu: () => import("./Menu")
  }
};
</script>

<style>
.q-toolbar {
  position: relative;
  padding: 0 12px;
  min-height: 20px;
  width: 100%;
}
</style>
<style lang="sass">
.my-menu-link
  color: black
  background: #efe9e5
</style>
