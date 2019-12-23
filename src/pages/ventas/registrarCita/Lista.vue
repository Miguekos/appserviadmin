<template>
  <div class="full-width">
    <!--    <q-markup-table dark class="bg-indigo-8">-->
    <div>
      <p
        class="bg-secondary glossy shadow-5 text-center text-white text-subtitle1"
      >
        Listado
      </p>
    </div>
    <div class="q-pa-xs">
      <q-table
        :pagination.sync="pagination"
        dense
        :data="info"
        :columns="columns"
      />
    </div>
    <!--    {{ info }}-->
  </div>
</template>
<script>
export default {
  props: ["info"],
  data() {
    return {
      pagination: {
        sortBy: "fe_citcli",
        descending: true,
        page: 1,
        rowsPerPage: 5
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "fe_citcli",
          required: true,
          label: "Fecha",
          align: "left",
          field: "fe_citcli",
          sortable: true
        },
        {
          name: "us_regist",
          align: "center",
          label: "Usuario",
          field: "us_regist",
          sortable: true
        },
        {
          name: "no_coment",
          align: "center",
          label: "Comentario",
          field: "no_coment",
          sortable: true
        }
      ],
      resumen: {},
      model: null,
      separator: "cell"
    };
  },
  methods: {},
  created() {
    console.log("se cargo el created de resumen");
    // this.$q.loading.show({ delay: 400 });
  }
};
</script>
