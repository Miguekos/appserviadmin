<template>
  <div class="full-width">
    <!--    <q-markup-table dark class="bg-indigo-8">-->
    <div>
      <p class="bg-secondary shadow-5 text-center text-white text-subtitle1">
        Listado
      </p>
    </div>
    <div class="q-pa-xs">
      <q-table hide-bottom dense :data="info" :columns="columns" />
    </div>
    <!--    {{ info }}-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          name: "no_semsve",
          required: true,
          label: "Fecha",
          align: "left",
          field: "no_semsve",
          sortable: true
        },
        {
          name: "ca_semafo",
          align: "center",
          label: "Usuario",
          field: "ca_semafo",
          sortable: true
        },
        {
          name: "ca_semafo",
          align: "center",
          label: "Comentario",
          field: "ca_semafo",
          sortable: true
        }
      ],
      info: [],
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
