<template>
  <div class="full-width">
    <!--    <q-markup-table dark class="bg-indigo-8">-->
    <div>
      <p class="bg-secondary shadow-5 text-center text-white">
        Ver N° Orden
      </p>
    </div>
    <div class="">
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
            <q-td key="a" :props="props">
              <q-badge
                text-color="white"
                :style="coloreando(props.row.b)"
                :label="props.row.a"
              />
            </q-td>
            <q-td key="c" :props="props">
              {{ props.row.c }}
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
          name: "a",
          required: true,
          label: "Semaforo",
          align: "left",
          field: "a",
          sortable: true
        },
        {
          name: "b",
          align: "left",
          label: "Cantidad",
          field: "b",
          sortable: true
        },
        {
          name: "c",
          align: "left",
          label: "Cantidad",
          field: "c",
          sortable: true
        }
      ],
      model: "",
      info: [
        {
          a: "ER",
          b: "#0F58E1",
          c: "En revision"
        },
        {
          a: "FR",
          b: "#468CF7",
          c: "Fecha de Respuesta"
        },
        {
          a: "NC",
          b: "#0F0206",
          c: "Nueva Contesta"
        },
        {
          a: "NR",
          b: "#929A9E",
          c: "No Responde la llamada"
        },
        {
          a: "SR",
          b: "#D31F58",
          c: "Sin Revisar por parte del cliente"
        }
      ],
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
    // this.listar_motivo_seguimiento()
    //   .then(resp => {
    //     console.log(resp);
    //     this.info = resp;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // this.$q.loading.show({ delay: 400 });
  }
};
</script>
