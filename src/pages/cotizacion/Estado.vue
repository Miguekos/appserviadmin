<template>
  <div class="full-width">
    <!--    <q-markup-table dark class="bg-indigo-8">-->
    <div>
      <p class="bg-secondary shadow-5 text-center text-white">
        Estado
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
        sortBy: "no_sigsco",
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
          a: "AN",
          b: "#E10F12",
          c: "Anulado"
        },
        {
          a: "AP",
          b: "#0F58E1",
          c: "Aprobado"
        },
        {
          a: "OP",
          b: "#DF8904",
          c: "Otro proveedor"
        },
        {
          a: "PR",
          b: "#94D304",
          c: "Pre-aprobado"
        }
      ],
      resumen: {},
      separator: "cell"
    };
  },
  methods: {
    ...mapActions("reque", ["listar_estado_seguimiento"]),
    coloreando(arg) {
      return `background-color: ${arg}`;
    }
  },
  mounted() {
    console.log("se cargo el mounted de Estado");
    // this.listar_estado_seguimiento()
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
