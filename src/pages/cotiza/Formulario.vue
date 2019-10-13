<template>
  <div>
    <q-page padding>
      <q-card class="my-card">
        <q-item class="bg-custom4">
          <q-item-section>
            <q-item-label>Formulario</q-item-label>
            <q-item-label caption>Requerimientos</q-item-label>
          </q-item-section>
          <q-item-section></q-item-section>
          <q-item-section></q-item-section>
          <q-item-section></q-item-section>
        </q-item>
        <q-form @submit.prevent="agregarProdcuto()">
          <div class="row">
            <q-item-section class="q-pa-sm">
              <q-select
                filled
                dense
                v-model="model"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="options"
                @filter="filterFn"
                label="Buscar por productos"
                option-value="no_client"
                option-label="no_client"
                @input="input2"
                auto-select
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </q-item-section>
            <q-item-section class="q-pa-sm">
              <q-input filled dense v-model="cantidad" label="Cant." />
            </q-item-section>
            <q-item-section class="q-pa-sm">
              <q-btn size="md" dense type="submit" @click="submit" color="info"
                >Agregar</q-btn
              >
            </q-item-section>
          </div>
        </q-form>
        <div class="row">
          <div class="q-pa-sm col-xs-12 col-md-6">
            <q-table
              dense
              title="Productos"
              :data="SelectsProduc"
              :columns="columnsProductos"
              row-key="id"
            />
            <div class="q-mt-md text-right">
              <q-btn size="sm" color="green">Buscar Proveedores</q-btn>
            </div>
          </div>
          <div class="q-pa-sm col-xs-12 col-md-6">
            <q-table
              dense
              title="Proveedores"
              :data="formularioProvee"
              :columns="columnsProvee"
              row-key="id"
              :selected-rows-label="getSelectedString"
              selection="multiple"
              :selected.sync="selected"
            />

            <div class="q-mt-md text-right">
              <q-btn size="sm" color="green">Procesar</q-btn>
            </div>
          </div>
        </div>
        <q-item class="bg-custom4">
          <q-item-section>
            <q-item-label>Cotizacion</q-item-label>
            <q-item-label caption>Masivo</q-item-label>
          </q-item-section>
          <q-item-section></q-item-section>
          <q-item-section></q-item-section>
          <q-item-section> </q-item-section>
        </q-item>
        <ListaCompraProveedor />
      </q-card>
    </q-page>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("proveedor", [
      "formularioProductos",
      "SelectsProduc",
      "formularioProvee"
    ])
  },
  data: () => ({
    alert: false,
    cantidad: "",
    model: "",
    options: [],
    lotrOpts: [],
    columnsProductos: [
      {
        name: "id",
        required: true,
        label: "N°",
        align: "left",
        field: row => row.id,
        format: val => `${val}`,
        sortable: true
      },
      {
        name: "Proveedor",
        required: true,
        label: "Proveedor",
        align: "left",
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
      },
      {
        name: "Cantidad",
        align: "center",
        label: "Cantidad",
        field: "cantidad",
        sortable: true
      }
    ],
    columnsProvee: [
      {
        name: "Proveedor",
        required: true,
        label: "Proveedor",
        align: "left",
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
      },
      {
        name: "Cantidad",
        align: "center",
        label: "Cantidad",
        field: "cantidad",
        sortable: true
      }
    ],
    selected: [],
    productosProvee: [],
    notif: () => {}
  }),
  methods: {
    ...mapActions("proveedor", ["addProduct"]),
    agregarProdcuto() {
      console.log(`cantidad: ${this.cantidad.length}`);
      if (this.model.length > 0 && this.cantidad.length > 0) {
        this.addProduct({
          id: this.SelectsProduc.length + 1,
          name: this.model,
          cantidad: this.cantidad
        })
          .then(() => {
            console.log("se agrego correctamente");
            this.model = "";
            this.cantidad = "";
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$q.notify({
          message: `No puedes guardas productos con campos vacios`,
          timeout: 1000,
          color: "negative"
        });
      }
    },
    getSelectedString() {
      return this.selected.length === 0
        ? ""
        : `${this.selected.length} record${
            this.selected.length > 1 ? "s" : ""
          } selected of ${this.data.length}`;
    },
    filterFn(val, update, abort) {
      const optionString = this.lotrOpts;
      console.log(abort);
      update(() => {
        const needle = val.toLowerCase();
        this.options = optionString.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    input2(val) {
      this.notif();
      this.notif = this.$q.notify({
        message: `Producto: ${JSON.stringify(val)} seleccionado.`,
        timeout: 500,
        color: "positive"
      });
    }
  },
  components: {
    ListaCompraProveedor: () => import("./ListaCompraProveedor")
    // TablaFiltro: () => import("./TablaFiltro"),
    // CuadroResumen: () => import("./CuadroResumen"),
    // AddRegistro: () => import("./Create")
  },
  async created() {
    // await this.getClientes();
    this.options = await this.formularioProductos;
    this.lotrOpts = await this.formularioProductos;
  }
  // name: 'PageName',
};
</script>

<style></style>
