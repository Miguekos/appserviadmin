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
    <!--        {{ info }}-->
  </div>
</template>
<script>
export default {
  props: ["info"],
  data() {
    return {
      pagination: {
        sortBy: "fe_segven",
        descending: true,
        page: 1,
        rowsPerPage: 5
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "fe_segven",
          required: true,
          label: "Fecha",
          align: "left",
          field: "fe_segven",
          sortable: true
        },
        {
          name: "co_client",
          align: "center",
          label: "Usuario",
          field: "co_client",
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
