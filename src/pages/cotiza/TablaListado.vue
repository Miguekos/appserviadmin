<template>
  <div class="q-pa-md">
    <div>
      <p class="bg-secondary shadow-5 text-center text-white text-subtitle1">
        Requerimientos
      </p>
    </div>
    <div class="q-pb-md">
      <div class="row no-wrap shadow-1 bg-grey-4">
        <q-toolbar>
          <q-input
            v-if="$q.screen.gt.xs"
            borderless
            class="full-width"
            placeholder="Buscar"
            dense
            color="primary"
            v-model="filter"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-input
            v-else
            class="full-width"
            borderless
            placeholder="Buscar"
            dense
            color="primary"
            v-model="filter"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-space />

          <!--          <q-btn-->
          <!--            flat-->
          <!--            dense-->
          <!--            no-wrap-->
          <!--            color="positive"-->
          <!--            icon="add"-->
          <!--            no-caps-->
          <!--            label="Nuevo"-->
          <!--            class="q-ml-sm q-px-md"-->
          <!--          />-->
          <!--          <q-btn-->
          <!--            flat-->
          <!--            dense-->
          <!--            no-wrap-->
          <!--            color="negative"-->
          <!--            icon="remove"-->
          <!--            no-caps-->
          <!--            label="Eliminar"-->
          <!--            class="q-ml-sm q-px-md"-->
          <!--          />-->
          <q-btn
            flat
            dense
            no-wrap
            color="primary"
            icon="cloud_upload"
            no-caps
            label="Exportar"
            class="q-ml-sm q-px-md"
          />
        </q-toolbar>
      </div>
    </div>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-table
        dense
        v-show="showSimulatedReturnData"
        :data="getRegistros"
        :columns="columns"
        row-key="id_reqcot"
        binary-state-sort
        :filter="filter"
        :loading="loading"
        loading-label="Cargando Data"
        :selected-rows-label="getSelectedString"
        selection="multiple"
        :selected.sync="selected"
      >
        <q-inner-loading :showing="visible">
          <q-spinner-gears size="550px" color="red" />
        </q-inner-loading>
      </q-table>
    </transition>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("example", ["getRegistros"])
  },
  data() {
    return {
      selected: [],
      visible: true,
      showSimulatedReturnData: true,
      loading: false,
      filter: "",
      rowCount: 10,
      columns: [
        {
          name: "id_reqcot",
          required: true,
          label: "Nro.",
          align: "left",
          field: "id_reqcot",
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "fe_regist",
          align: "left",
          label: "Fecha Registro.",
          field: "fe_regist",
          sortable: true
        },
        {
          name: "no_razsoc",
          align: "left",
          label: "Razon Social",
          field: "no_razsoc",
          sortable: true
        },
        {
          name: "no_contac",
          align: "left",
          label: "Nro. Contacto",
          field: "no_contac",
          sortable: true
        },
        {
          name: "ca_diapen",
          align: "left",
          label: "Dias Pendiente",
          field: "ca_diapen",
          sortable: true
        },
        {
          name: "fe_reqcot",
          align: "left",
          label: "F. Cotizacion.",
          field: "fe_reqcot",
          sortable: true
        },
        {
          name: "no_estreq",
          align: "left",
          label: "Estado",
          field: "no_estreq",
          sortable: true
        },
        {
          name: "de_reqcot",
          align: "left",
          label: "Detalle",
          field: "de_reqcot",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ]
    };
  },
  methods: {
    ...mapActions("example", ["registros"]),
    getSelectedString() {
      return this.selected.length === 0 ? "" : `${this.selected.length}`;
    }
  },
  async created() {
    // this.$q.loading.show();
    this.loading = true;
    await this.registros();
    this.loading = false;
    // this.$q.loading.hide();
  }
};
</script>
