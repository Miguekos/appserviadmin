<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      selection="single"
      :selected.sync="selected"
      :data="info"
      :columns="columns"
      row-key="id_provee"
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
          placeholder="Buscar"
          dense
          color="primary"
          v-model="filter"
        >
          <template v-if="selected != ''" v-slot:append>
            <q-btn
              outline
              dense
              class="bg-warning text-white"
              @click="detalleProve()"
              >ver</q-btn
            >
          </template>
          <template v-else v-slot:append>
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
    ...mapGetters("proveedor", ["Proveedores"])
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
          name: "id_provee",
          required: true,
          label: "Nro.",
          align: "left",
          field: "id_provee",
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "no_provee",
          align: "left",
          label: "Nombre",
          field: "no_provee",
          sortable: true
        },
        {
          name: "Email",
          align: "left",
          label: "Email",
          field: "nu_docpro",
          sortable: true
        },
        {
          name: "Direccion",
          align: "left",
          label: "Direccion",
          field: "nu_sigpro",
          sortable: true
        }
      ]
    };
  },
  methods: {
    ...mapActions("proveedor", ["getProveedor"]),
    detalleProve() {
      const proveedor = this.selected[0].id_provee;
      console.log(proveedor);
      this.$router.push(`/proveedores/detalle/${proveedor}`);
    }
  },
  async mounted() {
    await this.getProveedor();
    this.info = this.Proveedores;
  }
};
</script>
