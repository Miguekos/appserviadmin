<template>
  <div class="q-pa-md">
    <q-table
      @click-row="loading = true"
      title="Treats"
      :selected.sync="selected"
      :data="info"
      :columns="columns"
      row-key="id_provee"
      :filter="filter"
      :loading="loading"
      :pagination.sync="pagination"
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
        <!--        <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>-->
      </template>
    </q-table>
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
      pagination: {
        sortBy: "id",
        descending: false,
        page: 2,
        rowsPerPage: 3,
        rowsNumber: 3,
        pagesNumber: 3
      },
      info: [],
      loading: false,
      filter: "",
      columns: [
        {
          name: "#",
          required: true,
          label: "Nro.",
          align: "left",
          field: "id_client",
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "Nombre",
          align: "left",
          label: "Nombre",
          field: "no_client",
          sortable: true
        },
        {
          name: "Email",
          align: "left",
          label: "Email",
          field: "no_corele",
          sortable: true
        },
        {
          name: "Direccion",
          align: "left",
          label: "Direccion",
          field: "no_direcc",
          sortable: true
        },
        {
          name: "DNI",
          align: "left",
          label: "DNI / C.E",
          field: "nu_docide",
          sortable: true
        },
        {
          name: "Telefono",
          align: "left",
          label: "Telefono",
          field: "nu_telefono",
          sortable: true
        }
      ]
    };
  },
  methods: {
    rowClick(val) {
      console.log(val);
      this.$router.push(`/cliente/detalle/${val.id_client}`);
    },
    ...mapActions("clientes", ["getClientes"])
  },
  async mounted() {
    await this.getClientes();
    this.info = this.Clientes;
  }
};
</script>
