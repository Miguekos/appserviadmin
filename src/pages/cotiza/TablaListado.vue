<template>
  <div class="q-pa-md">
    <div>
      <p class="bg-secondary dense shadow-5 text-center text-white">
        Requerimientos
      </p>
    </div>
    <div class="q-pb-md">
      <div class="row no-wrap shadow-1 bg-grey-4">
        <q-toolbar>
          <q-input
            v-if="$q.screen.gt.xs"
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
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id_reqcot" :props="props">
              {{ props.row.id_reqcot }}
            </q-td>
            <q-td key="fe_regist" :props="props">
              {{ props.row.fe_regist }}
            </q-td>
            <q-td key="no_razsoc" :props="props">
              {{ props.row.no_razsoc }}
            </q-td>
            <q-td key="no_contac" :props="props">
              {{ props.row.no_contac }}
            </q-td>
            <q-td key="no_usuari" :props="props">
              {{ props.row.no_usuari }}
            </q-td>
            <q-td key="ca_diapen" :props="props">
              {{ props.row.ca_diapen }}
            </q-td>
            <q-td key="fe_reqcot" :props="props">
              {{ props.row.fe_reqcot }}
            </q-td>
            <q-td key="no_estreq" :props="props">
              {{ props.row.no_estreq }}
            </q-td>
            <q-td key="de_reqcot" :props="props">
              <q-tooltip
                transition-show="flip-right"
                transition-hide="flip-left"
                anchor="top middle"
                self="top middle"
                content-style="font-size: 16px"
              >
                {{ props.row.de_reqcot }}
              </q-tooltip>
              Con comentario
            </q-td>
            <q-td key="co_percon" :props="props">
              <div class="q-gutter-xs">
                <!--                {{ props.row.no_estreq }}-->
                <q-btn
                  v-if="props.row.no_estreq == 'RECHAZADO'"
                  dense
                  @click="prueba(props.row.co_percon)"
                  size="sm"
                  color="green"
                  icon="far fa-frown"
                />
                <q-btn
                  dense
                  @click="
                    dialogRegistrarCitaCliente({
                      estado: true,
                      cliente: props.row.co_client,
                      contacto: props.row.co_percon
                    })
                  "
                  size="sm"
                  color="orange"
                  icon="edit"
                />
                <q-btn size="sm" dense color="red" icon="delete" />
              </div>
            </q-td>
          </q-tr>
        </template>
        <q-inner-loading :showing="visible">
          <q-spinner-gears size="550px" color="red" />
        </q-inner-loading>
      </q-table>
    </transition>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { date } from "quasar";
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
          // format: val => date.formatDate(val, "DD-MM-YYYY HH:MM"),
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
          label: "Contacto",
          field: "no_contac",
          sortable: true
        },
        {
          name: "no_usuari",
          align: "left",
          label: "Usuario",
          field: "no_usuari",
          sortable: true
        },
        {
          name: "ca_diapen",
          align: "center",
          label: "Dias Pendiente",
          field: "ca_diapen",
          sortable: true
        },
        {
          name: "fe_reqcot",
          align: "left",
          label: "F. Cotizacion.",
          field: "fe_reqcot",
          format: val => date.formatDate(val, "DD-MM-YYYY"),
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
        },
        {
          name: "co_percon",
          align: "center",
          label: "Acciones",
          field: "co_percon",
          sortable: true
        }
      ]
    };
  },
  methods: {
    ...mapActions("example", ["registros"]),
    formatearFecha(fecha) {
      return date.formatDate(fecha, "YYYY-MM-DD");
    },
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
