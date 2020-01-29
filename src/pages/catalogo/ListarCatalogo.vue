<template>
  <div class="full-width">
    <div>
      <p class="bg-secondary dense shadow-5 text-center text-white">
        Catalogos
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
    <q-table
      dense
      :data="get_listar_catalogos_new"
      :columns="columns"
      row-key="no_catpro"
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
        sortBy: "co_catpro",
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
          name: "co_catpro",
          required: true,
          label: "Nro_",
          align: "left",
          field: "co_catpro",
          sortable: true
        },
        {
          name: "no_catpro",
          align: "left",
          label: "Nro. Document.",
          field: "no_catpro",
          sortable: true
        },
        {
          name: "co_arcadj",
          label: "Arcadj.",
          align: "left",
          field: "co_arcadj",
          sortable: true
        },
        {
          name: "nu_ordcat",
          label: "Sigla",
          align: "left",
          field: "nu_ordcat"
        }
      ]
    };
  },
  components: {
    // TituloTabla: () => import("../../components/TituloTablas")
  },
  methods: {
    ...mapActions("clientes", ["getClientes", "eliminarCliente"]),
    ...mapActions("example", ["listar_catalogos_new"]),
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
      window.open(
        `http://127.0.0.1:3000/api/containers/container1/download/${
          val.co_arcadj
        }`,
        "_blank"
      );
      // this.$router.push(
      //   `http://127.0.0.1:3000/api/containers/container1/download/${
      //     val.co_arcadj
      //   }`
      // );
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
    this.info = await this.listar_catalogos_new();
  }
};
</script>
