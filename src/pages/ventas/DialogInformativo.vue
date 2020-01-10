<template>
  <div>
    <q-card>
      <!--      <q-img-->
      <!--        src="https://media-cdn.tripadvisor.com/media/photo-s/0a/47/a8/91/chicken-salad-sandwich.jpg"-->
      <!--      />-->
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">{{ info[0].no_percon }}</div>
          <div class="col-auto text-grey q-pt-md">
            <!--            {{ info[0].no_percon }}-->
          </div>
        </div>

        <!--        <q-rating v-model="stars" :max="5" size="32px" />-->
      </q-card-section>

      <q-card-section>
        <div class="row q-gutter-md justify-around flex">
          <div class="column">
            <div>
              <q-field label="Empresa" stack-label :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    {{ info[0].no_client }}
                  </div>
                </template>
              </q-field>
            </div>
            <div>
              <q-field label="Sigla" stack-label :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    {{ info[0].no_sigcli }}
                  </div>
                </template>
              </q-field>
            </div>
            <div>
              <q-field label="RUC" stack-label :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    {{ info[0].nu_doccli }}
                  </div>
                </template>
              </q-field>
            </div>
            <div>
              <q-field label="Sector" stack-label :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    {{ info[0].no_sececo }}
                  </div>
                </template>
              </q-field>
            </div>
          </div>
          <q-space></q-space>
          <div class="col self-center">
            <q-avatar
              square
              size="90px"
              font-size="82px"
              :icon="emotions(info[0].co_estemo)"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div>
          <div>
            <div>
              <q-field label="Contacto" stack-label :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    {{ info[0].no_percon }}
                  </div>
                </template>
              </q-field>
            </div>
            <div>
              <q-field label="Area" stack-label :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    {{ info[0].no_arelab }}
                  </div>
                </template>
              </q-field>
            </div>
            <div>
              <q-field label="Telefono" stack-label :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    {{ info[0].nu_telefo }}
                  </div>
                </template>
              </q-field>
            </div>
            <div>
              <q-field label="Correo" stack-label :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    {{ info[0].no_corele }}
                  </div>
                </template>
              </q-field>
            </div>
            <div>
              <q-field label="Direccion" stack-label :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    {{ info[0].no_direcc }}
                  </div>
                </template>
              </q-field>
            </div>
            <div>
              <q-field label="Semaforo" stack-label :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    {{ info[0].co_semsve }}
                  </div>
                </template>
              </q-field>
            </div>
            <div>
              <q-field label="Consultas" stack-label :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    {{ info[0].ca_consul }}
                  </div>
                </template>
              </q-field>
            </div>
            <div>
              <q-field label="Catalogos" stack-label :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    {{ info[0].ca_catalo }}
                  </div>
                </template>
              </q-field>
            </div>
            <div>
              <q-field label="Citas" stack-label :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    {{ info[0].ca_citcli }}
                  </div>
                </template>
              </q-field>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <!--      <q-card-actions>-->
      <!--        <q-btn flat round icon="event" v-close-popup />-->
      <!--        <q-btn flat v-close-popup>5:30PM</q-btn>-->
      <!--        <q-btn flat v-close-popup>7:30PM</q-btn>-->
      <!--        <q-btn flat v-close-popup>9:00PM</q-btn>-->
      <!--        <q-btn flat color="primary" v-close-popup>Reserve</q-btn>-->
      <!--      </q-card-actions>-->
    </q-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["co_person"],
  data() {
    return {
      dense: true,
      columns: [
        {
          name: "no_client",
          required: true,
          label: "EMPRESA",
          align: "left",
          field: "no_client",
          sortable: true
        },
        {
          name: "no_sigcli",
          required: true,
          label: "SIGLA",
          align: "left",
          field: "no_sigcli",
          sortable: true
        },
        {
          name: "nu_doccli",
          required: true,
          label: "RUC",
          align: "left",
          field: "nu_doccli",
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
          name: "no_percon",
          required: true,
          label: "CONTACTO",
          align: "left",
          field: "no_percon",
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
          name: "nu_telefo",
          required: true,
          label: "TELEFONO",
          align: "left",
          field: "nu_telefo",
          sortable: true
        },
        {
          name: "no_corele",
          align: "left",
          label: "CORREO",
          field: "no_corele",
          sortable: true
        },
        {
          name: "no_direcc",
          align: "left",
          label: "DIRECCION",
          field: "no_direcc",
          sortable: true
        },
        {
          name: "co_semsve",
          align: "left",
          label: "SEMAFORO",
          field: "co_semsve",
          sortable: true
        },
        {
          name: "ca_consul",
          align: "left",
          label: "CONSULTAS",
          field: "ca_consul",
          sortable: true
        },
        {
          name: "ca_catalo",
          align: "left",
          label: "CATOLOGOS",
          field: "ca_catalo",
          sortable: true
        },
        {
          name: "ca_citcli",
          align: "left",
          label: "CITAS",
          field: "ca_citcli",
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
