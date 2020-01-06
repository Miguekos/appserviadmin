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
            class="cursor-pointer"
            name="far fa-smile-beam"
            size="40px"
          ></q-icon>
          <q-icon
            class="cursor-pointer"
            name="far fa-smile-beam"
            size="40px"
          ></q-icon>
          <q-icon
            class="cursor-pointer"
            name="far fa-smile-beam"
            size="40px"
          ></q-icon>
          <q-icon
            class="cursor-pointer"
            name="far fa-smile-beam"
            size="40px"
          ></q-icon>
          <q-icon
            class="cursor-pointer"
            name="far fa-smile-beam"
            size="40px"
          ></q-icon>
          <q-icon
            class="cursor-pointer"
            name="far fa-smile-beam"
            size="40px"
          ></q-icon>
        </div>
      </q-card-section>
    </q-card>
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
    ...mapActions("example", ["listar_personas_contacto"]),
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
    this.listar_personas_contacto({
      persona: this.co_person
    })
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

<style scoped></style>
