<template>
  <div class="full-width">
    <!--    <q-markup-table dark class="bg-indigo-8">-->
    <div>
      <p class="bg-secondary shadow-5 text-center text-white text-subtitle1">
        Resumen
      </p>
    </div>
    <div class="q-pa-xs">
      <q-table hide-bottom dense :data="info" :columns="columns" />
    </div>
    <!--    {{ info }}-->
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      columns: [
        {
          name: "no_semsve",
          required: true,
          label: "Semaforo",
          align: "left",
          field: "no_semsve",
          sortable: true
        },
        {
          name: "ca_semafo",
          align: "center",
          label: "Cantidad",
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
  methods: {
    ...mapActions("example", ["getResumenVentas"])
  },
  created() {
    console.log("se cargo el created de resumen");
    this.getResumenVentas()
      .then(resp => {
        console.log(resp);
        this.info = resp;
      })
      .catch(err => {
        console.log(err);
      });
    // this.$q.loading.show({ delay: 400 });
  }
};
</script>
