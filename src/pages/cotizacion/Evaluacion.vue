<template>
  <div class="full-width">
    <!--    <q-markup-table dark class="bg-indigo-8">-->
    <div>
      <p class="bg-secondary shadow-5 text-center text-white">
        Area
      </p>
    </div>
    <div class="q-pa-xs">
      <q-table
        dense
        :data="info"
        :columns="columns"
        row-key="co_semsve"
        hide-bottom
        hide-header
        :pagination.sync="pagination"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="no_sigere" :props="props">
              <q-badge
                text-color="white"
                :style="coloreando(props.row.no_colhex)"
              >
                {{ props.row.no_sigare }}
              </q-badge>
            </q-td>
            <q-td key="no_arelab" :props="props">
              {{ props.row.no_arelab }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <!--    {{ info }}-->
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      colorin: "#89070f",
      pagination: {
        descending: false,
        page: 1,
        rowsPerPage: 7
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "no_sigere",
          required: true,
          label: "COD",
          align: "left",
          field: "no_sigere",
          sortable: true
        },
        {
          name: "no_arelab",
          required: true,
          label: "DESCRIPCION",
          align: "left",
          field: "no_arelab",
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
    ...mapActions("example", ["listar_area_laboral"]),
    coloreando(arg) {
      return `background-color: ${arg}`;
    },
    semaforo(arg) {
      let respuesta = "";
      if (arg == 0) {
        respuesta = "black";
      } else if (arg == 1) {
        respuesta = "blue";
      } else if (arg == 2) {
        respuesta = "green";
      } else if (arg == 3) {
        respuesta = "yellow";
      } else if (arg == 4) {
        respuesta = "amber";
      } else if (arg == 5) {
        respuesta = "red";
      }
      return respuesta;
    }
  },
  mounted() {
    console.log("se cargo el created de resumen");
    this.listar_area_laboral()
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
<style>
#color1 {
  color: #165f89;
}
</style>
