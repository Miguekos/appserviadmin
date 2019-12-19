<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :data="info"
      :columns="columns"
      row-key="no_client"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :selected.sync="selected"
    >
      <q-tr
        slot="body"
        slot-scope="props"
        :props="props"
        @click.native="rowClick(props.row)"
        class="cursor-pointer"
      >
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.value }}
        </q-td>
      </q-tr>

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
        <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>
      </template>
    </q-table>
    <q-separator />
    <q-toolbar class="text-center">
      <q-toolbar-title class="q-pa-md row justify-around">
        <!-- <q-toolbar-title class="q-pa-md q-gutter-md"> -->
        <q-btn color="positive" text-color="white" label="Nuevo" />
        <q-btn color="warning" text-color="white" label="Editar" />
        <q-btn color="negative" text-color="white" label="Eliminar" />
      </q-toolbar-title>
    </q-toolbar>
    <!--    {{ $data.filter }}-->
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
          align: "left",
          field: "ca_percon"
        },
        {
          name: "ca_direcc",
          label: "Cant. Direcciones",
          align: "left",
          field: "ca_direcc"
        }
      ],
      columnsq: [
        {
          name: "Nombre",
          align: "left",
          label: "Nombre",
          field: "no_client",
          sortable: true
        },
        {
          name: "Nro. Documento",
          align: "left",
          label: "Nro. Documento",
          field: "nu_doccli",
          sortable: true
        },
        {
          name: "TipoDocumento",
          align: "left",
          label: "Tipo Documeto",
          field: "no_tipdoc",
          sortable: true
        },
        {
          name: "sigla",
          align: "left",
          label: "Sigla",
          field: "no_sigcli",
          sortable: true
        },
        {
          name: "CantContactos",
          align: "left",
          label: "Cant. Contactos",
          field: "ca_percon",
          sortable: true
        },
        {
          name: "CantDirecciones",
          align: "left",
          label: "Cant. Direccion",
          field: "ca_direcc",
          sortable: true
        }
      ]
    };
  },
  methods: {
    rowClick(val) {
      console.log(val);
      this.$router.push(`/cliente/detalle/${val.co_client}`);
    },
    ...mapActions("clientes", ["getClientes"]),
    getSelectedString() {
      return this.selected.length === 0
        ? ""
        : `${this.selected.length} record${
            this.selected.length > 1 ? "s" : ""
          } selected of ${this.data.length}`;
    }
  },
  async mounted() {
    await this.getClientes();
    this.info = this.Clientes;
  }
};
</script>
