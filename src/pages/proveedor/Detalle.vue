<template>
  <q-page padding>
    <q-card class="my-card">
      <q-item class="bg-custom4">
        <q-item-section>
          <q-item-label>Proveedores</q-item-label>
          <q-item-label caption>Detalle</q-item-label>
        </q-item-section>
      </q-item>
      <div>
        <div>
          <ListaDirecciones :datafld="getProvDireccion" :id_pro="id_pro" />
        </div>
        <div>
          <ListaContactos :datafld="getProvContactos" :id_pro="id_pro" />
        </div>
      </div>
      <!--      {{ getProvContactos }}-->
      <!--      {{ getProvDireccion }}-->
      <!--      <ListarCliente />-->
    </q-card>
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
    ...mapGetters("proveedor", ["getProvContactos", "getProvDireccion"])
  },
  components: {
    ListaDirecciones: () => import("./TablaDetalleDireccion"),
    ListaContactos: () => import("./TablaDetalleContactos")
    // CuadroResumen: () => import("./CuadroResumen")
  },
  methods: {
    ...mapActions("proveedor", ["contactoProveedor", "direccionProveedor"])
  },
  async mounted() {
    const id = this.$route.params.id;
    this.id_pro = id;
    console.log(id);
    await this.contactoProveedor(id);
    await this.direccionProveedor(id);
  }
  // name: 'PageName',
};
</script>

<style></style>
