<template>
  <div class="q-pa-md">
    <q-table
      title="Listado"
      :data="registros"
      :columns="columns"
      row-key="name"
      binary-state-sort
      :filter="filter"
      :loading="loading"
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
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("example", ["registros"])
  },
  data() {
    return {
      loading: false,
      filter: "",
      rowCount: 10,
      columns: [
        {
          name: "name",
          required: true,
          label: "Nro.",
          align: "left",
          field: "nu_canite",
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "nu_reque",
          align: "left",
          label: "Nro. Requerimiento",
          field: "nu_requer",
          sortable: true
        },
        {
          name: "fe_reque",
          align: "left",
          label: "Fecha Reque.",
          field: "fe_requer",
          sortable: true
        },
        {
          name: "cliente",
          align: "left",
          label: "Cliente",
          field: "no_client",
          sortable: true
        },
        {
          name: "contacto",
          align: "left",
          label: "Contacto",
          field: "no_contac",
          sortable: true
        },
        {
          name: "di_pendi",
          align: "left",
          label: "Dias Pendientes",
          field: "ca_diapen",
          sortable: true
        },
        {
          name: "fe_cotiz",
          align: "left",
          label: "Fecha Cotizacion",
          field: "fe_cotiza",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "estado",
          align: "left",
          label: "Estado",
          field: "no_estado",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "pdf",
          align: "left",
          label: "Pdf",
          field: "",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ],
      data: []
    };
  },
  methods: {
    ...mapActions("example", ["registros"])
  },
  async created() {
    const asd = await this.registros();
    this.data = asd;
    console.log(asd);
  }
};
</script>
