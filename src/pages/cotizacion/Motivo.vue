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
        row-key="co_semsve"
        hide-bottom
        hide-header
        :pagination.sync="pagination"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="no_sigmre" :props="props">
              {{ props.row.no_sigmre }}
            </q-td>
            <q-td key="no_motsre" :props="props">
              {{ props.row.no_motsre }}
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
        descending: false,
        page: 1,
        rowsPerPage: 8
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "no_sigmre",
          required: true,
          label: "COD",
          align: "left",
          field: "no_sigmre",
          sortable: true
        },
        {
          name: "no_motsre",
          required: true,
          label: "Motivo",
          align: "left",
          field: "no_motsre",
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
    ...mapActions("clientes", ["listar_motivo_seguimiento_requerimiento"]),
    emotions(arg) {
      let respuesta = "";
      if (arg == 1) {
        respuesta = "far fa-laugh-beam";
      } else if (arg == 2) {
        respuesta = "far fa-smile-beam";
      } else if (arg == 3) {
        respuesta = "far fa-meh";
      } else if (arg == 4) {
        respuesta = "far fa-frown";
      } else if (arg == 5) {
        respuesta = "far fa-angry";
      } else if (arg == 6) {
        respuesta = "far fa-kiss-wink-heart";
      } else if (arg == 7) {
        respuesta = "fas fa-dollar-sign";
      } else if (arg == 8) {
        respuesta = "far fa-meh-blank";
      }
      return respuesta;
    },
    emotiColor(arg) {
      let color = "";
      if (arg == 1) {
        color = "color1";
      } else if (arg == 2) {
        color = "color2";
      } else if (arg == 3) {
        color = "color3";
      } else if (arg == 4) {
        color = "color4";
      } else if (arg == 5) {
        color = "color5";
      } else if (arg == 6) {
        color = "color6";
      } else if (arg == 7) {
        color = "color7";
      } else if (arg == 8) {
        color = "color8";
      }
      return color;
    }
  },
  mounted() {
    console.log("se cargo el created de resumen");
    this.listar_motivo_seguimiento_requerimiento()
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
  color: #0ec70b;
}
#color2 {
  color: #0b97c7;
}
#color3 {
  color: #e6ef21;
}
#color4 {
  color: #eba34c;
}
#color5 {
  color: #f02d1d;
}
#color6 {
  color: #c809f7;
}
#color7 {
  color: #b3a9a9;
}
</style>
