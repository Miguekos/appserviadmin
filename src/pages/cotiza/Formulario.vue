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
          <q-item-section> </q-item-section>
        </q-item>
        <div class="row" style="border: red">
          <q-item class="col-sm-6 col-xs-12">
            <div class="q-pa-md col-md-6">
              <div class="q-gutter-md row">
                <q-select
                  filled
                  v-model="model"
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  :options="options"
                  @filter="filterFn"
                  hint="Buscar por productos"
                  style="width: 250px; padding-bottom: 32px"
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
              </div>
            </div>
            <div class="q-pa-md col-md-6">
              <q-input filled hint="Cant." />
            </div>
          </q-item>
          <q-item class="flex-center col-sm-6 col-xs-12">
            <div class="q-pa-md">
              <q-table
                title="Proveedores"
                :data="data"
                :columns="columns"
                row-key="name"
                :selected-rows-label="getSelectedString"
                selection="multiple"
                :selected.sync="selected"
              />

              <div class="q-mt-md">
                <!--                Selected: {{ JSON.stringify(selected) }}-->
              </div>
            </div>
          </q-item>
        </div>
        <!--        <TablaListado />-->
      </q-card>
    </q-page>
    <q-page padding>
      <q-card class="my-card">
        <q-item class="bg-custom4">
          <q-item-section>
            <q-item-label>Cotizacion</q-item-label>
            <q-item-label caption>Masivo</q-item-label>
          </q-item-section>
          <q-item-section></q-item-section>
          <q-item-section></q-item-section>
          <q-item-section> </q-item-section>
        </q-item>
        <div>
          <ListaCompraProveedor />
        </div>
      </q-card>
    </q-page>
  </div>
</template>

<script>
const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
// import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    // ...mapGetters("example", ["getDialogCrear"])
  },
  data: () => ({
    alert: false,
    model: null,
    options: stringOptions,
    columns: [
      {
        name: "Proveedores",
        required: true,
        label: "Dessert (100g serving)",
        align: "left",
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
      },
      {
        name: "ID",
        align: "center",
        label: "Calories",
        field: "calories",
        sortable: true
      }
    ],
    data: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: "14%",
        iron: "1%"
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        sodium: 129,
        calcium: "8%",
        iron: "1%"
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        sodium: 337,
        calcium: "6%",
        iron: "7%"
      },
      {
        name: "Cupcake",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        sodium: 413,
        calcium: "3%",
        iron: "8%"
      },
      {
        name: "Gingerbread",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        sodium: 327,
        calcium: "7%",
        iron: "16%"
      },
      {
        name: "Jelly bean",
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        sodium: 50,
        calcium: "0%",
        iron: "0%"
      },
      {
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        sodium: 38,
        calcium: "0%",
        iron: "2%"
      },
      {
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        sodium: 562,
        calcium: "0%",
        iron: "45%"
      },
      {
        name: "Donut",
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        sodium: 326,
        calcium: "2%",
        iron: "22%"
      },
      {
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        sodium: 54,
        calcium: "12%",
        iron: "6%"
      }
    ],
    selected: []
  }),
  methods: {
    getSelectedString() {
      return this.selected.length === 0
        ? ""
        : `${this.selected.length} record${
            this.selected.length > 1 ? "s" : ""
          } selected of ${this.data.length}`;
    },
    filterFn(val, update, abort) {
      console.log(abort);
      update(() => {
        const needle = val.toLowerCase();
        this.options = stringOptions.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    input2(val) {
      this.notif();
      this.notif = this.$q.notify({
        message: `Cliente: ${JSON.stringify(val.no_client)} seleccionado.`,
        timeout: 1000,
        color: "positive"
      });
    }
    // ...mapActions("example", ["dialogCreate"]),
  },
  components: {
    ListaCompraProveedor: () => import("./ListaCompraProveedor")
    // TablaFiltro: () => import("./TablaFiltro"),
    // CuadroResumen: () => import("./CuadroResumen"),
    // AddRegistro: () => import("./Create")
  }
  // name: 'PageName',
};
</script>

<style></style>
