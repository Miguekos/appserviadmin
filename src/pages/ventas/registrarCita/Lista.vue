<template>
  <div class="full-width">
    <!--    <q-markup-table dark class="bg-indigo-8">-->
    <div>
      <p class="bg-secondary   shadow-5 text-center text-white">
        Listado
      </p>
    </div>
    <div class="q-pa-xs">
      <q-table
        :pagination.sync="pagination"
        dense
        :data="info"
        :columns="columns"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="fe_citcli" :props="props">
              {{ formatearFecha(props.row.fe_citcli) }}
            </q-td>
            <q-td key="no_regist" :props="props">
              {{ props.row.no_regist }}
            </q-td>
            <q-td key="no_sigare" :props="props">
              <q-badge :style="coloreando(props.row.no_colare)">
                {{ props.row.no_sigare }}
              </q-badge>
            </q-td>
            <q-td key="acciones" :props="props">
              <div class="q-gutter-xs">
                <!--                <q-btn-->
                <!--                  dense-->
                <!--                  @click="eliminar()"-->
                <!--                  size="sm"-->
                <!--                  color="orange-6"-->
                <!--                  icon="edit"-->
                <!--                />-->
                <q-btn
                  dense
                  @click="eliminar()"
                  size="sm"
                  color="red-6"
                  icon="delete"
                />
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <!--    {{ info }}-->
  </div>
</template>
<script>
import { date } from "quasar";
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
          name: "no_regist",
          align: "center",
          label: "Contacto",
          field: "no_regist",
          sortable: true
        },
        {
          name: "no_sigare",
          align: "center",
          label: "Area",
          field: "no_sigare",
          sortable: true
        },
        {
          name: "acciones",
          align: "center",
          label: "",
          field: "acciones",
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
      return date.formatDate(fecha, "YYYY-MM-DD");
    },
    eliminar() {
      alert("Eliminar");
    }
  },
  created() {
    console.log("se cargo el created de resumen");
    // this.$q.loading.show({ delay: 400 });
  }
};
</script>
