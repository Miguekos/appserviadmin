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
      selection="multiple"
      :selected.sync="selected"
      :filter="filter"
      :loading="loading"
      class="my-sticky-header-table cursor-pointer"
      :pagination.sync="pagination"
    >
      <template v-slot:body-cell="props">
        <q-td :props="props" @click.native="rowClick(props.row)">
          <div>{{ props.value }}</div>
        </q-td>
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
        <q-btn
          size="sm"
          color="negative"
          text-color="white"
          label="Eliminar"
          @click="eliminarRow()"
        />
      </q-toolbar-title>
    </q-toolbar>
    <!-- {{ $data.selected }} -->
    <!--    {{ Clientes }}-->
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
      pagination: {
        sortBy: "no_client",
        descending: false,
        page: 1,
        rowsPerPage: 7
        // rowsNumber: xx if getting data from a server
      },
      selected: [],
      info: [],
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
          name: "nu_doccli",
          align: "left",
          label: "Sector",
          field: "nu_doccli",
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
        }
      ]
    };
  },
  components: {
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
