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
          <ListaDirecciones :datafld="getProvDireccion"/>
        </div>
        <div>
          <ListaContactos :datafld="getProvContactos"/>
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
    console.log(id);
    await this.contactoProveedor(id);
    await this.direccionProveedor(id);
  }
  // name: 'PageName',
};
</script>

<style></style>
