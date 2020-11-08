<template>
  <div class="full-width">
    <!--    <q-markup-table dark class="bg-indigo-8">-->
    <div>
      <p class="bg-secondary   shadow-5 text-center text-white">
        Historial
      </p>
    </div>
    <div class="q-pa-xs">
      <q-table
        :pagination.sync="pagination"
        dense
        :data="info"
        :columns="columns"
        row-key="fe_segven"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="fe_segven" :props="props">
              {{ formatearFecha(props.row.fe_segven) }}
            </q-td>
            <q-td key="no_regist" :props="props">
              {{ props.row.no_regist }}
            </q-td>
            <q-td key="no_sigsve" :props="props">
              <q-badge :style="coloreando(props.row.no_colhex)">
                {{ props.row.no_sigsve }}
              </q-badge>
            </q-td>
            <q-td key="no_coment" :props="props">
              {{ props.row.no_coment }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <!--        {{ info }}-->
  </div>
</template>
<script>
import { date } from "quasar";
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
          name: "no_regist",
          align: "center",
          label: "Usuario",
          field: "no_regist",
          sortable: true
        },
        {
          name: "no_sigsve",
          align: "center",
          label: "Estado",
          field: "no_sigsve",
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
  methods: {
    coloreando(arg) {
      return `background-color: ${arg}`;
    },
    formatearFecha(fecha) {
      return date.formatDate(fecha, "YYYY-MM-DD HH:mm");
    }
  },
  created() {
    console.log("se cargo el created de resumen");
    // this.$q.loading.show({ delay: 400 });
  }
};
</script>
