<template>
  <q-page padding>
    <q-card class="my-card">
      <TituloTabla titulo="DETALLE" />
      <div>
        <div>
          <ListaDirecciones :datafld="getClieDireccion" :id_pro="id_pro" />
        </div>
        <div>
          <ListaContactos :datafld="getClieContactos" :id_pro="id_pro" />
        </div>
      </div>
      <!--      <ListarCliente />-->
    </q-card>
    <!--    {{ getClieDireccion }}-->
    <!--    {{ getClieContactos }}-->
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      id_pro: null
    };
  },
  computed: {
    ...mapGetters("clientes", ["getClieContactos", "getClieDireccion"])
  },
  components: {
    ListaDirecciones: () => import("./TablaDetalleDireccion"),
    ListaContactos: () => import("./TablaDetalleContactos"),
    TituloTabla: () => import("../../components/TituloTablas")
    // Atras: () => import("../../components/IrAtras")
    // CuadroResumen: () => import("./CuadroResumen")
  },
  methods: {
    ...mapActions("clientes", ["contactoCliente", "direccionCliente"]),
    atras() {
      console.log("Ir Atras");
      this.$router.go(-1);
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    if (this.id != null) {
      console.log(id);
    } else {
      console.log("id");
      console.log(id);
      console.log("id");
      this.id_pro = id;
      console.log(id);
      this.$q.loading.show();
      await this.contactoCliente(id);
      await this.direccionCliente(id);
      this.$q.loading.hide();
    }
  }
  // name: 'PageName',
};
</script>

<style></style>
