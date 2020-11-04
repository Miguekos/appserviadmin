<template>
  <div class="full-width">
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
        </q-toolbar>
      </div>
    </div>
    <q-table
      dense
      :data="Clientes"
      :columns="columns"
      row-key="nu_doccli"
      :selected-rows-label="getSelectedString"
      :selected.sync="selected"
      :filter="filter"
      :loading="loading"
      class="my-sticky-header-table cursor-pointer"
      :pagination.sync="pagination"
    >
      <template v-slot:body-cell-detail="props">
        <q-td :props="props">
          <q-btn
            size="sm"
            @click="rowClick(props.row)"
            dense
            round
            color="secondary"
            icon="pageview"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn
              dense
              size="sm"
              @click="rowClick(props.row)"
              color="info"
              icon="visibility"
            />
            <q-btn
              dense
              size="sm"
              @click="editarRow(props.row)"
              color="warning"
              icon="edit"
            />
          </div>
        </q-td>
      </template>
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span> Nada que mostrar... </span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
      </template>
    </q-table>
    <!-- <div class="q-mt-md">
      Selected: {{ JSON.stringify(selected) }}
    </div> -->
    <q-separator />
    <q-toolbar class="text-center">
      <q-toolbar-title class="q-pa-md row justify-around">
        <!-- <q-toolbar-title class="q-pa-md q-gutter-md"> -->
        <q-btn
          size="sm"
          color="positive"
          text-color="white"
          label="Nuevo"
          @click="URL('/cliente/create')"
        />
        <!-- <q-btn
          size="sm"
          color="negative"
          text-color="white"
          label="Eliminar"
          @click="eliminarRow()"
        /> -->
      </q-toolbar-title>
    </q-toolbar>
    <!-- {{ $data.selected }} -->
    <!--    {{ Clientes }}-->
    <div>
      <q-dialog
        v-model="updateCliente"
        persistent
        transition-show="flip-down"
        transition-hide="flip-up"
      >
        <q-card style="width: 700px;">
          <DialogUpdate :dataUpdate="dataUpdate" />
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("clientes", ["Clientes"])
  },
  data() {
    return {
      mode: "list",
      invoice: {},
      data_employee_dialog: {},
      employee_dialog: false,
      updateCliente: false,
      pagination: {
        sortBy: "no_client",
        descending: false,
        page: 1,
        rowsPerPage: 7
        // rowsNumber: xx if getting data from a server
      },
      selected: [],
      dataUpdate: [],
      loading: false,
      filter: "",
      columns: [
        {
          name: "no_client",
          required: true,
          label: "Cliente",
          align: "left",
          field: "no_client",
          sortable: true
        },
        {
          name: "no_sigcli",
          label: "Sigla",
          align: "left",
          field: "no_sigcli"
        },
        {
          name: "nu_doccli",
          align: "left",
          label: "R.U.C.",
          field: "nu_doccli",
          sortable: true
        },
        {
          name: "no_sigsec",
          align: "left",
          label: "Sector",
          field: "no_sigsec",
          sortable: true
        },
        {
          name: "no_tipdoc",
          label: "Distrito",
          align: "left",
          field: "no_tipdoc",
          sortable: true
        },
        {
          name: "ca_percon",
          label: "Cant. Contactos",
          align: "center",
          field: "ca_percon"
        },
        {
          name: "ca_direcc",
          label: "Cant. Direcciones",
          align: "center",
          field: "ca_direcc"
        },
        {
          name: "action",
          align: "right",
          label: "Acciones",
          field: "action",
          sortable: true
        }
      ]
    };
  },
  components: {
    DialogUpdate: () => import("./Update")
    // TituloTabla: () => import("../../components/TituloTablas")
  },
  methods: {
    ...mapActions("clientes", ["getClientes", "eliminarCliente"]),
    onRowClick() {
      console.log("Se preciono una ROW");
    },
    eliminarRow() {
      if (this.selected.length === 0) {
        this.$q.notify({
          color: "red",
          textColor: "white",
          icon: "fas fa-times",
          message: "Debe selecionar un registro para Eliminar.!"
        });
      }
      for (let index = 0; index < this.selected.length; index++) {
        const element = this.selected[index];
        console.log(element);
        //tipo de persona
        console.log(element.co_tipper);
        // Codigo de cliente
        console.log(element.co_client);
        this.eliminarCliente({
          p_id: element.co_client,
          tipoPersona: element.co_tipper,
          desactivarCliente: "S"
        })
          .then(resp => {
            console.log(resp);
            this.$q.notify({
              color: "green",
              textColor: "white",
              icon: "fas fa-check-circle",
              message: "Eliminado Correctamente.!"
            });
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            this.getClientes();
            // this.info = this.Clientes;
          });
      }
    },
    editarRow(val) {
      this.dataUpdate = val;
      console.log(val);
      this.updateCliente = true;
    },
    URL(arg) {
      this.$router.push(arg);
    },
    rowClick(val) {
      console.log(val);
      this.$router.push(`/cliente/detalle/${val.co_client}`);
    },
    rowClickNew() {
      console.log();
      if (this.selected.length === 0) {
        this.$q.notify({
          color: "red",
          textColor: "white",
          icon: "fas fa-times",
          message: "Debe selecionar un registro para VER.!"
        });
      } else {
        console.log(this.selected[0].co_client);
        this.$router.push(`/cliente/detalle/${this.selected[0].co_client}`);
      }
    },
    getSelectedString() {
      return this.selected.length === 0 ? "" : `${this.selected.length}`;
    }
    // getSelectedString() {
    //     return this.selected.length === 0
    //         ? ""
    //         : `${this.selected.length} record${
    //             this.selected.length > 1 ? "s" : ""
    //         } selected of ${this.info.length}`;
    // }
  },
  async mounted() {
    await this.getClientes();
    this.info = this.Clientes;
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
