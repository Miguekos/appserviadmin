<template>
  <div class="q-pa-md">
    <q-table
      dense
      title="Clientes"
      :data="info"
      :columns="columns"
      row-key="nu_doccli"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :selected.sync="selected"
      :filter="filter"
      :loading="loading"
      class="cursor-pointer"
    >
      <template v-slot:body-cell="props">
        <q-td :props="props" @click.native="rowClick(props.row)">
          <div>{{ props.value }}</div>
        </q-td>
      </template>
      <template v-slot:top>
        <img
          style="height: 50px; width: 50px"
          src="/statics/minilogoservi.png"
        />
        <q-space />
        <q-input
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
        <!--        <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>-->
      </template>
    </q-table>

    <!-- <div class="q-mt-md">
      Selected: {{ JSON.stringify(selected) }}
    </div> -->
    <q-separator />
    <q-toolbar class="text-center">
      <q-toolbar-title class="q-pt-md row justify-around">
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
          color="warning"
          text-color="white"
          label="Ver"
          @click="rowClickNew()"
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
    ...mapGetters("clientes", ["Clientes"])
  },
  data() {
    return {
      selected: [],
      info: [],
      loading: false,
      filter: "",
      pagination: {
        sortBy: "name",
        descending: true,
        page: 2,
        rowsPerPage: 3
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "desc",
          required: true,
          label: "Cliente",
          align: "left",
          field: "no_client",
          sortable: true
        },
        {
          name: "nu_doccli",
          align: "left",
          label: "Nro. Document.",
          field: "nu_doccli",
          sortable: true
        },
        {
          name: "no_tipdoc",
          label: "Tipo Docuemt.",
          align: "left",
          field: "no_tipdoc",
          sortable: true
        },
        {
          name: "no_sigcli",
          label: "Sigla",
          align: "left",
          field: "no_sigcli"
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
  methods: {
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
              color: "green-4",
              textColor: "white",
              icon: "fas fa-check-circle",
              message: "Eliminado Correctamente.!"
            });
          })
          .catch(err => {
            console.log(err);
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
    ...mapActions("clientes", ["getClientes", "eliminarCliente"]),
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
