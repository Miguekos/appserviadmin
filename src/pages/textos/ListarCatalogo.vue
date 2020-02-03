<template>
  <div class="full-width">
    <div>
      <p class="bg-secondary dense shadow-5 text-center text-white">
        Catalogos de texto
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
        </q-toolbar>
      </div>
    </div>
    <q-table
      dense
      :data="info"
      :columns="columns"
      row-key="co_txtcor"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :selected.sync="selected"
      :filter="filter"
      :loading="loading"
      class="cursor-pointer"
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
          color="negative"
          text-color="white"
          label="Eliminar"
          @click="eliminarRow()"
        />
      </q-toolbar-title>
    </q-toolbar>
    <!-- {{ $data.selected }} -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("clientes", ["Clientes"]),
    ...mapGetters("example", ["get_listar_catalogos_new"])
  },
  data() {
    return {
      pagination: {
        sortBy: "nu_ordcat",
        dataLista: [],
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
          name: "co_txtcor",
          required: true,
          label: "Nro",
          align: "left",
          field: "co_txtcor",
          sortable: true
        },
        {
          name: "no_txtcor",
          align: "left",
          label: "Nombre de Texto",
          field: "no_txtcor",
          sortable: true
        },
        {
          name: "de_txtcor",
          label: "Texto",
          align: "left",
          field: "de_txtcor",
          sortable: true
        }
      ]
    };
  },
  components: {
    // TituloTabla: () => import("../../components/TituloTablas")
  },
  methods: {
    ...mapActions("clientes", [
      "getClientes",
      "eliminarCliente",
      "listar_texto_correos"
    ]),
    ...mapActions("example", [
      "listar_catalogos_new",
      "mantenimiento_catalogos"
    ]),
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
        // Codigo de cliente
        this.mantenimiento_catalogos(element.co_txtcor)
          .then(resp => {
            console.log(resp);
            this.$q.notify({
              position: "top-right",
              color: "green",
              textColor: "white",
              icon: "fas fa-check-circle",
              message: "Eliminado Correctamente.!"
            });
          })
          .catch(err => {
            console.log(err);
          })
          .finally(async () => {
            this.info = await this.listar_texto_correos();
            // this.info = this.Clientes;
          });
      }
    },
    URL(arg) {
      this.$router.push(arg);
    },
    rowClick(val) {
      console.log(val);
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
    // await this.getClientes();
    this.info = await this.listar_texto_correos();
  }
};
</script>
