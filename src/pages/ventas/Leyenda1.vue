<template>
  <div class="full-width">
    <!--    <q-markup-table dark class="bg-indigo-8">-->
    <div>
      <p class="bg-secondary shadow-5 text-center text-white">
        Trato
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
            <q-td key="co_emotic" :props="props">
              <!--              <q-badge color="deep-purple">-->
              <q-icon
                size="xs"
                :id="emotiColor(props.row.co_emotic)"
                :name="emotions(props.row.co_emotic)"
              ></q-icon>
              <!--                {{ props.row.co_emotic }}-->
              <!--              </q-badge>-->
            </q-td>
            <q-td key="no_emotic" :props="props">
              {{ props.row.no_emotic }}
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
          name: "co_emotic",
          required: true,
          label: "COD",
          align: "left",
          field: "co_emotic",
          sortable: true
        },
        {
          name: "no_emotic",
          required: true,
          label: "DESCRIPCION",
          align: "left",
          field: "no_emotic",
          sortable: true
        },
        {
          name: "no_sigsec",
          required: true,
          label: "COD",
          align: "left",
          field: "no_sigsec",
          sortable: true
        },
        {
          name: "no_sececo",
          required: true,
          label: "SECTOR",
          align: "left",
          field: "no_sececo",
          sortable: true
        },
        {
          name: "no_sigare",
          required: true,
          label: "COD",
          align: "left",
          field: "no_sigare",
          sortable: true
        },
        {
          name: "no_arelab",
          required: true,
          label: "AREA",
          align: "left",
          field: "no_arelab",
          sortable: true
        },
        {
          name: "no_sigsve",
          required: true,
          label: "COD",
          align: "left",
          field: "no_sigsve",
          sortable: true
        },
        {
          name: "no_estsve",
          align: "left",
          label: "ESTADO",
          field: "no_estsve",
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
    ...mapActions("example", ["emoticon_cliente"]),
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
    this.emoticon_cliente()
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
