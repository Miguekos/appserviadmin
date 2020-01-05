<template>
  <div>
    <q-card>
      <!--      <q-img-->
      <!--        src="https://media-cdn.tripadvisor.com/media/photo-s/0a/47/a8/91/chicken-salad-sandwich.jpg"-->
      <!--      />-->

      <q-card-section>
        <!--        <q-btn-->
        <!--          fab-->
        <!--          color="primary"-->
        <!--          icon="place"-->
        <!--          class="absolute"-->
        <!--          style="top: 0; right: 12px; transform: translateY(-50%);"-->
        <!--        />-->

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">{{ info[0].no_percon }}</div>
          <div class="col-auto text-grey q-pt-md">
            <!--            <q-icon name="place" /> 250 ft-->
          </div>
        </div>

        <q-rating v-model="stars" :max="5" size="32px" />
      </q-card-section>

      <q-card-section>
        <div class="text-subtitle1">{{ info[0].no_arelab }}</div>
        <div class="text-subtitle2 text-grey">
          {{ info[0] }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" v-close-popup />
        <q-btn flat v-close-popup>5:30PM</q-btn>
        <q-btn flat v-close-popup>7:30PM</q-btn>
        <q-btn flat v-close-popup>9:00PM</q-btn>
        <q-btn flat color="primary" v-close-popup>Reserve</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["co_person"],
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
