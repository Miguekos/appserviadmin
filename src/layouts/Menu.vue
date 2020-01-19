<template>
  <div>
    <q-list>
      <q-expansion-item
        group="somegroup"
        icon="group"
        label="Mantenimiento"
        default-opened
        header-class="text-white bg-green-5 rounded-borders"
      >
        <!-- Proveedores -->
        <q-item
          :header-inset-level="1"
          clickable
          v-ripple
          :active="link === '/proveedores'"
          @click="URL('/proveedores')"
          active-class="my-menu-link"
        >
          <q-item-section>Proveedores</q-item-section>
        </q-item>
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        group="somegroup"
        icon="attach_money"
        label="Ventas"
        header-class="text-white bg-orange-5 rounded-borders"
      >
        <q-item
          clickable
          v-ripple
          :active="link === '/cotiza'"
          @click="URL('/cotiza')"
          active-class="my-menu-link"
        >
          <q-item-section no-wrap
            >01 - Requerimiento de cotizacion</q-item-section
          >
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === '/cotizacion'"
          @click="URL('/cotizacion')"
          active-class="my-menu-link"
        >
          <q-item-section no-wrap
            >02 - Seguimiento de cotizacion</q-item-section
          >
        </q-item>

        <q-item clickable v-ripple active-class="my-menu-link">
          <q-item-section no-wrap>03 - Orden de Compra Cliente</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === '/ventas'"
          @click="URL('/ventas')"
          active-class="my-menu-link"
        >
          <q-item-section no-wrap>04 - Clientes</q-item-section>
        </q-item>

        <q-item clickable v-ripple active-class="my-menu-link">
          <q-item-section no-wrap>05 - Agenda de Citas</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === '/cliente'"
          @click="URL('/cliente')"
          active-class="my-menu-link"
        >
          <q-item-section>06 - Mantenimiento de Cliente</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === '/catalogo'"
          @click="URL('/catalogo')"
          active-class="my-menu-link"
        >
          <q-item-section no-wrap>07 - Mantenimiento de Ventas</q-item-section>
        </q-item>
      </q-expansion-item>

      <q-separator />
    </q-list>
  </div>
</template>
<script>
export default {
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
  }
};
</script>
<style lang="sass">
.my-menu-link
  color: black
  background: #efe9e5
</style>
