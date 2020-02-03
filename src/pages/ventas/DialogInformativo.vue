<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">{{ info[0].no_percon }}</div>
          <div class="col-auto text-grey q-pt-md"></div>
        </div>
      </q-card-section>
      <!--      {{ info }}-->
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
          <div class="col flex flex-center">
            <q-avatar
              square
              :id="emotiColor(info[0].co_estemo)"
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
                    {{ info[0].no_sigpro }} {{ info[0].no_nombre }}
                    {{ info[0].no_apepat }} {{ info[0].no_apemat }}
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
                    {{ info[0].no_direcc }} , {{ info[0].no_distri }},
                    {{ info[0].no_provin }} , {{ info[0].no_depart }}
                  </div>
                </template>
              </q-field>
            </div>
            <div>
              <q-field label="Semaforo" stack-label :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    <!--                    {{ info[0].co_semsve }}-->
                    <q-btn
                      round
                      size="6px"
                      :color="semaforo(info[0].co_semsve)"
                    />
                    Sin Respuesta
                    <!--                    {} -->
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
    </q-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["persona"],
  data() {
    return {
      dense: true,
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
    console.log("Dialogo Informativo");
    this.listar_personas_contacto({
      persona: this.persona
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
