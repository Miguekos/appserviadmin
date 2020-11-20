<template>
  <div class="q-pa-md">
    <div>
      <p class="bg-orange dense shadow-5 text-center text-white">
        Citas Historial
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
        :pagination="pagination"
        v-show="showSimulatedReturnData"
        :data="info"
        :columns="columns"
        row-key="co_citcli"
        binary-state-sort
        :filter="filter"
        :loading="loading"
        loading-label="Cargando Data"
        class="my-sticky-header-table"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="co_citcli" :props="props">
              {{ props.row.co_citcli }}
            </q-td>
            <q-td key="no_sigcli" :props="props">
              {{ props.row.no_sigcli }}
            </q-td>
            <q-td key="no_percon" :props="props">
              {{ props.row.no_percon }}
            </q-td>
            <q-td key="no_sigare" :props="props">
              {{ props.row.no_sigare }}
            </q-td>
            <q-td key="no_direcc" :props="props">
              {{ props.row.no_direcc }}
            </q-td>
            <q-td key="fe_citcli" :props="props">
              {{ formatearFecha(props.row.fe_citcli) }}
            </q-td>
            <q-td key="ho_citcli" :props="props">
              {{ props.row.ho_citcli }}
            </q-td>
            <q-td key="no_estcit" :props="props">
              {{ props.row.no_estcit }}
            </q-td>
          </q-tr>
        </template>
        <q-inner-loading :showing="visible">
          <q-spinner-gears size="550px" color="red" />
        </q-inner-loading>
      </q-table>
    </transition>
    <q-dialog v-model="alert">
      <Edit @evtFechaCadAtrativos="alert = false" :info="informacion" />
    </q-dialog>
    <q-dialog v-model="check"> <checkBox :dataCheck="itemsListos" /> </q-dialog>
    <!-- {{ itemsListos }} -->
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
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 20
        // rowsNumber: xx if getting data from a server
      },
      info: [],
      selection: ["teal", "red"],
      itemsListos: [],
      check: false,
      alert: false,
      selected: [],
      visible: true,
      showSimulatedReturnData: true,
      loading: false,
      filter: "",
      rowCount: 10,
      columns: [
        {
          name: "co_citcli",
          required: true,
          label: "Nro.",
          align: "left",
          field: "co_citcli",
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "no_sigcli",
          align: "left",
          label: "Sigla Cliente",
          field: "no_sigcli",
          sortable: true
        },
        {
          name: "no_percon",
          align: "left",
          label: "Contacto",
          field: "no_percon",
          sortable: true
        },
        {
          name: "no_sigare",
          align: "left",
          label: "Area",
          field: "no_sigare",
          sortable: true
        },
        {
          name: "no_direcc",
          align: "left",
          label: "Direccion",
          field: "no_direcc",
          sortable: true
        },
        {
          name: "fe_citcli",
          align: "center",
          label: "Fecha",
          field: "fe_citcli",
          format: val => date.formatDate(val, "DD-MM-YYYY"),
          sortable: true
        },
        {
          name: "ho_citcli",
          align: "left",
          label: "Hora",
          field: "ho_citcli",
          sortable: true
        },
        {
          name: "no_estcit",
          align: "left",
          label: "Estado",
          field: "no_estcit",
          sortable: true
        }
      ],
      informacion: []
    };
  },
  components: {
    checkBox: () => import("./checkBox")
  },
  methods: {
    checkbox() {
      this.listar_rechazo_citas()
        .then(resp => {
          console.log(resp);
          this.itemsListos = resp;
          this.check = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    coloreando(arg) {
      console.log(arg);
      return `background-color: ${arg}`;
    },
    ...mapActions("example", [
      "registros",
      "eliminar_requerimiento_cotizacion"
    ]),
    ...mapActions("clientes", [
      "listar_rechazo_citas",
      "listar_citas_historico"
    ]),
    formatearFecha(fecha) {
      return date.formatDate(fecha, "YYYY-MM-DD");
    },
    getSelectedString() {
      return this.selected.length === 0 ? "" : `${this.selected.length}`;
    },
    cancelarCita(arg) {
      console.log(arg.co_citcli);
      this.$q
        .dialog({
          title: "Confirmar",
          message: "Esta seguro que quiere eliminar?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          console.log(">>>> OK");
        })
        .onOk(() => {
          console.log(">>>> second OK catcher");
        })
        .onCancel(() => {
          console.log(">>>> Cancel");
        })
        .onDismiss(() => {
          console.log("I am triggered on both OK and Cancel");
        });
    },
    actualizarCotizacion(arg) {
      console.log(arg);
      this.informacion = arg;
      console.log("Se preciono el boton");
      this.alert = true;
      // this.$router.push("/cotizacion/create");
      // this.$q.notify({
      //   color: "red",
      //   textColor: "white",
      //   message: "Por definir.!"
      // });
      console.log("Boron precinado");
    }
  },
  async mounted() {
    // this.$q.loading.show();
    this.loading = true;
    this.info = await this.listar_citas_historico();
    this.$on("actualizar", (this.info = await this.listar_citas_historico()));
    this.loading = false;
    // this.$q.loading.hide();
  }
};
</script>
<style lang="sass">
.my-sticky-header-table
  /* max height is important */
  .q-table__middle
    max-height: 400px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #26a69a
    color: white

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 28px
</style>
