<template>
  <div class="full-width">
    <!--    <q-markup-table dark class="bg-indigo-8">-->
    <div>
      <p class="bg-secondary shadow-5 text-center text-white">
        Motivo
      </p>
    </div>
    <div class="q-pa-xs">
      <q-table
        dense
        :data="info"
        :columns="columns"
        row-key="no_sigeva"
        hide-bottom
        hide-header
        :pagination="pagination"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="no_sigmot" :props="props">
              <q-badge
                text-color="white"
                :style="coloreando(props.row.no_colhex)"
                :label="props.row.no_sigmot"
              />
            </q-td>
            <q-td key="no_motsco" :props="props">
              {{ props.row.no_motsco }}
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
      pagination: {
        sortBy: "no_sigmot",
        descending: false,
        page: 1,
        rowsPerPage: 15
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "no_sigmot",
          required: true,
          label: "Semaforo",
          align: "left",
          field: "no_sigmot",
          sortable: true
        },
        {
          name: "no_motsco",
          align: "left",
          label: "Cantidad",
          field: "no_motsco",
          sortable: true
        }
      ],
      model: "",
      info: [],
      resumen: {},
      separator: "cell"
    };
  },
  methods: {
    ...mapActions("reque", ["listar_motivo_seguimiento"]),
    coloreando(arg) {
      return `background-color: ${arg}`;
    }
  },
  mounted() {
    console.log("se cargo el mounted de Estado");
    this.listar_motivo_seguimiento()
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
