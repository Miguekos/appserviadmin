<template>
  <div class="q-pa-md">
    <div>
      <p class="bg-secondary shadow-5 text-center text-white text-subtitle1">
        Listado
      </p>
    </div>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-table
        v-show="showSimulatedReturnData"
        title="Listado"
        :data="getRegistros"
        :columns="columns"
        row-key="name"
        binary-state-sort
        :filter="filter"
        :loading="loading"
        loading-label="Cargadno Data"
      >
        <q-inner-loading :showing="visible">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
        <template v-slot:top>
          <img
            style="height: 50px; width: 50px"
            src="/statics/minilogoservi.png"
          />
          <q-space />
          <q-input
            borderless
            dense
            debounce="300"
            color="primary"
            v-model="filter"
            label="Buscar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
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
    ...mapActions("example", ["registros"])
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
