<template>
  <div class="q-pa-md">
<!--    {{ datafld }}-->
    <q-table
      :data="datafld"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
      :pagination.sync="pagination"
    >
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
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
    <!--    {{ $data }}-->
  </div>
</template>
<script>
// import { mapActions, mapGetters } from "vuex";
export default {
  props: ["datafld"],
  computed: {
    // ...mapGetters("clientes", ["Clientes"])
  },
  data() {
    return {
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
          name: "id",
          required: true,
          label: "Nro.",
          align: "left",
          field: "id_provee",
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "direccion",
          align: "left",
          label: "Direccion",
          field: "no_direcc",
          sortable: true
        },
        {
          name: "codigoubigeo",
          align: "left",
          label: "Codigo Ubigeo",
          field: "co_ubigeo",
          sortable: true
        },
        {
          name: "id_provee",
          align: "left",
          label: "id_provee",
          field: "id_provee",
          sortable: true
        }
      ]
    };
  },
  methods: {
    // ...mapActions("clientes", ["getClientes"])
  },
  async mounted() {
    // await this.getClientes();
    // this.info = this.Clientes;
  }
};
</script>
