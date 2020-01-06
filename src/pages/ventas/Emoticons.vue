<template>
  <div>
    <q-card>
      <q-card-section class="row justify-center">
        <!--        <div>-->
        {{ infoEmoti.no_percon }}
        <!--        </div>-->
      </q-card-section>
      <q-card-section class="row justify-center">
        <div class="q-gutter-md">
          <q-icon
            v-for="(item, index) in info"
            :key="index"
            class="cursor-pointer"
            :name="emotions(item.co_emotic)"
            :id="emotiColor(item.co_emotic)"
            @click="selection(item.co_emotic)"
            size="40px"
          ></q-icon>
        </div>
      </q-card-section>
      <!--      <q-card-section class="row justify-center">-->
      <!--        <div class="q-gutter-md">-->
      <!--          <q-icon-->
      <!--            class="cursor-pointer"-->
      <!--            name="far fa-smile-beam"-->
      <!--            size="40px"-->
      <!--          ></q-icon>-->
      <!--          <q-icon-->
      <!--            class="cursor-pointer"-->
      <!--            name="far fa-smile-beam"-->
      <!--            size="40px"-->
      <!--          ></q-icon>-->
      <!--          <q-icon-->
      <!--            class="cursor-pointer"-->
      <!--            name="far fa-smile-beam"-->
      <!--            size="40px"-->
      <!--          ></q-icon>-->
      <!--          <q-icon-->
      <!--            class="cursor-pointer"-->
      <!--            name="far fa-smile-beam"-->
      <!--            size="40px"-->
      <!--          ></q-icon>-->
      <!--          <q-icon-->
      <!--            class="cursor-pointer"-->
      <!--            name="far fa-smile-beam"-->
      <!--            size="40px"-->
      <!--          ></q-icon>-->
      <!--          <q-icon-->
      <!--            class="cursor-pointer"-->
      <!--            name="far fa-smile-beam"-->
      <!--            size="40px"-->
      <!--          ></q-icon>-->
      <!--        </div>-->
      <!--      </q-card-section>-->
    </q-card>
    <!--    {{ info }}-->
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["infoEmoti"],
  data() {
    return {
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
    selection(arg) {
      if (arg == 1) {
        this.$q.notify({
          message: "EXCELENTE",
          color: "black",
          position: "top-right"
        });
      } else if (arg == 2) {
        this.$q.notify({
          message: "BUENO",
          color: "black",
          position: "top-right"
        });
      } else if (arg == 3) {
        this.$q.notify({
          message: "NORMAL",
          color: "black",
          position: "top-right"
        });
      } else if (arg == 4) {
        this.$q.notify({
          message: "MODERADO",
          color: "black",
          position: "top-right"
        });
      } else if (arg == 5) {
        this.$q.notify({
          message: "AMARGO",
          color: "black",
          position: "top-right"
        });
      } else if (arg == 6) {
        this.$q.notify({
          message: "ATREVIDO",
          color: "black",
          position: "top-right"
        });
      } else if (arg == 7) {
        this.$q.notify({
          message: "DENEGADO",
          color: "black",
          position: "top-right"
        });
      } else if (arg == 8) {
        this.$q.notify({
          message: "PENDIENTE",
          color: "black",
          position: "top-right"
        });
      }
    },
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
        respuesta = "far fa-hand-holding-usd";
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
