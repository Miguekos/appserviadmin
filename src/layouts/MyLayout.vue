<template>
  <div>
    <q-layout view="hHh lpR fFf">
      <q-header
        size="sm"
        dense
        elevated
        class="bg-white text-grey-8 q-py-xs"
        height-hint="58"
      >
        <q-toolbar>
          <!--          {{ $q.screen.gt.xs }}-->
          <q-btn
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
            icon="menu"
            color="green"
          />

          <!--          <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">-->
          <q-btn flat no-caps no-wrap class="q-ml-xs">
            <!-- <q-icon name="fas fa-ad" color="green" size="28px" /> -->
            <q-img
              src="/statics/minilogoservi.png"
              spinner-color="white"
              style="height: 30px; max-width: 40px"
            />
            <q-toolbar-title shrink class="text-weight-bold"
              >SJ Servi Admin</q-toolbar-title
            >
          </q-btn>
          <q-space />
          <div class="q-gutter-sm row items-center no-wrap">
            <q-btn round flat color="grey-8" icon="notifications">
              <q-badge color="red" text-color="white" floating>2</q-badge>
              <q-tooltip>Notificaciones</q-tooltip>
            </q-btn>
            <q-btn round flat @click="showDialog">
              <q-avatar size="26px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
              <q-tooltip>Cuenta</q-tooltip>
            </q-btn>
          </div>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="leftDrawerOpen" content-class="bg-grey-3" :width="240">
        <q-scroll-area dense :thumb-style="thumbStyle" class="fit q-pa-sm">
          <q-list padding>
            <q-item
              dense
              v-for="link in links1"
              :key="link.text"
              v-ripple
              clickable
              @click="URL(link.path)"
            >
              <q-item-section avatar>
                <q-icon color="grey" :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator class="q-mt-md q-mb-xs" />

            <q-item-label header class="text-weight-bold text-uppercase"
              >Clientes</q-item-label
            >

            <q-item
              dense
              v-for="link in links3"
              :key="link.text"
              v-ripple
              clickable
              @click="URL(link.path)"
            >
              <q-item-section avatar>
                <q-icon color="grey" :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator class="q-my-md" />

            <q-item-label header class="text-weight-bold text-uppercase"
              >Proveedores</q-item-label
            >

            <q-item
              dense
              v-for="link in links6"
              :key="link.text"
              v-ripple
              clickable
              @click="URL(link.path)"
            >
              <q-item-section avatar>
                <q-icon color="grey" :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator class="q-my-md" />

            <q-item-label header class="text-weight-bold text-uppercase"
              >Usuarios</q-item-label
            >

            <q-item
              dense
              v-for="link in links4"
              :key="link.text"
              v-ripple
              clickable
              @click="URL(link.path)"
            >
              <q-item-section avatar>
                <q-icon color="grey" :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator class="q-my-md" />

            <q-item
              dense
              v-for="link in links5"
              :key="link.text"
              v-ripple
              clickable
              @click="URL(link.path)"
            >
              <q-item-section avatar>
                <q-icon color="grey" :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
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
                flat
                bordered
                auto-upload
                url="http://localhost:4444/upload"
                label="Cambiar imagen de Perfil"
                accept=".jpg, image/*"
                class="full-width"
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
      name: "",
      correo: "",
      newpassword: "",
      user: {},
      bar2: false,
      leftDrawerOpen: false,
      search: "",
      links1: [
        { icon: "home", text: "Home", path: "/" },
        { icon: "whatshot", text: "Dashboard", path: "/dashboard" },
        {
          icon: "subscriptions",
          text: "Cotizacion",
          path: "/cotizacion"
        },
        {
          icon: "subscriptions",
          text: "Formulario",
          path: "/formulario"
        }
      ],
      links2: [
        { icon: "folder", text: "Control" },
        { icon: "restore", text: "Inventario" },
        { icon: "watch_later", text: "Almacen" },
        { icon: "thumb_up_alt", text: "Proveedores" }
      ],
      links3: [
        { icon: "group", text: "Clientes", path: "/cliente" },
        {
          icon: "group_add\n",
          text: "Crear Clientes",
          path: "/cliente/create"
        }
      ],
      links4: [
        { icon: "supervised_user_circle", text: "Usuarios", path: "/user" },
        { icon: "person_add", text: "Crear Usuarios", path: "/user/create" }
      ],
      links5: [{ icon: "logout", text: "Salir", path: "logout" }],
      links6: [
        {
          icon: "supervised_user_circle",
          text: "Proveedor",
          path: "/proveedores"
        },
        {
          icon: "person_add",
          text: "Crear Proveedor",
          path: "/proveedores/create"
        }
      ],
      buttons1: [
        { text: "About" },
        { text: "Config" },
        { text: "Copyright" },
        { text: "Contact us" },
        { text: "Creators" },
        { text: "Advertise" },
        { text: "Developers" }
      ]
    };
  },
  methods: {
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
        console.log(arg);
        await this.$router.push(arg);
      }
    },
    getUrl(files) {
      return `http://localhost:4444/upload?count=${files.length}`;
    }
  }
};
</script>

<style lang="stylus">
.YL {
  &__toolbar-input-container {
    min-width: 100px;
    width: 55%;
  }

  &__toolbar-input-btn {
    border-radius: 0;
    border-style: solid;
    border-width: 1px 1px 1px 0;
    border-color: rgba(0, 0, 0, 0.24);
    max-width: 60px;
    width: 100%;
  }

  &__drawer-footer-link {
    color: inherit;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.75rem;

    &:hover {
      color: #000;
    }
  }
}
</style>
