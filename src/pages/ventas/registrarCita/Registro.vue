<template>
  <div class="full-width">
    <q-form @submit.stop="registrar" @reset="onReset" class="q-gutter-md">
      <div>
        <div>
          <p class="bg-secondary shadow-5 text-center text-white">
            Registro
          </p>
        </div>
        <div class="q-ma-sm">
          <q-input
            required="true"
            dense
            filled
            v-model="date"
            mask="####-##-##"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="date"
                    @input="() => $refs.qDateProxy.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="q-ma-sm">
          <q-input dense filled v-model="time" mask="time">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="time" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="q-ma-sm">
          <q-input
            dense
            v-model="listar_direccionVar"
            filled
            label="Direccion (AUXILIAR)"
          />
          <!--          <q-select-->
          <!--            label="Direccion"-->
          <!--            required="true"-->
          <!--            filled-->
          <!--            dense-->
          <!--            options-dense-->
          <!--            v-model="listar_direccionVar"-->
          <!--            :options="direcciones"-->
          <!--            option-label="no_direcc"-->
          <!--            option-value="co_direcc"-->
          <!--            map-options-->
          <!--            emit-value-->
          <!--            transition-show="flip-up"-->
          <!--            transition-hide="flip-down"-->
          <!--          />-->
        </div>

        <div class="q-ma-sm">
          <q-input
            dense
            v-model="text"
            filled
            type="textarea"
            label="Comentario"
          />
        </div>
      </div>
      <div class="q-gutter-md text-center">
        <q-btn
          type="submit"
          :loading="loadboton"
          :disable="loadboton"
          label="Grabar"
          size="sm"
          color="positive"
        />
        <q-btn label="Cerrar" @click="reset()" size="sm" color="red" />
      </div>
    </q-form>
    <!--    {{ direcciones }}-->
    <!--    {{ clienteR }}-->
    <!--    {{ contactoR }}-->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["clienteR", "contactoR", "direcciones"],
  computed: {
    ...mapGetters("example", ["registrosFiltroEstados"])
  },
  data() {
    return {
      loadboton: false,
      loadboton2: false,
      text: "",
      listar_direccionVar: null,
      time: "",
      direccion: "",
      date: "",
      loading: false,
      estadoFiltro: "",
      fechainicio: "",
      fechafin: "",
      cliente: "",
      size: ["xs", "sm", "md", "lg", "xl"],
      loading1: false,
      loading2: false,
      model: null,
      separator: "cell",
      options: []
    };
  },
  methods: {
    ...mapActions("example", [
      "registros",
      "dialogRegistrarCitaCliente",
      "listar_direccion",
      "mantenimiento_citas_cliente",
      "listar_citas",
      "seguimiento_cliente"
    ]),
    reset() {
      this.dialogRegistrarCitaCliente({
        estado: false
      });
      this.seguimiento_cliente({
        cliente: null,
        seguimiento: null,
        economico: null,
        semoforo: null
      })
        .then(resp => {
          this.$q.notify({
            color: "positive",
            message: "Tabla principal actualizada"
          });
          console.log(resp);
        })
        .catch(err => {
          console.log(err);
          this.$q.notify({
            color: "negative",
            message: "Uy.! algo salio mal"
          });
        });
    },
    onReset() {
      this.$q.notify({
        color: "info",
        message: "Por definir"
      });
    },
    registrar() {
      this.loadboton = true;
      const data = {
        cliente: this.clienteR,
        contacto: this.contactoR,
        codigodireccion: this.listar_direccionVar,
        comentario: this.text,
        fechaCita: this.date,
        horaCita: this.time
      };
      console.log(data);
      this.mantenimiento_citas_cliente({ ...data })
        .then(resp => {
          console.log(resp);
          this.$q.notify({
            color: "positive",
            message: "Registro Correcto"
          });
          this.listar_direccionVar = null;
          this.text = "";
          this.date = "";
          this.time = "";
          this.date = "";
          this.text = "";
          this.listar_citas({
            cliente: this.clienteR,
            contacto: this.contactoR
          })
            .then(resp => {
              console.log(resp);
              this.$q.notify({
                color: "positive",
                message: "Tabla Actualziada"
              });
              setTimeout(() => {
                // we're done, we reset loading state
                this.loadboton = false;
              }, 2000);
            })
            .catch(err => {
              console.log(err);
              this.$q.notify({
                color: "negative",
                message: "Uy.! algo salio mal"
              });
            });
        })
        .catch(err => {
          console.log(err);
          this.$q.notify({
            color: "negative",
            message: "Uy.! algo salio mal"
          });
        });
    },
    crearCotiza() {
      this.$router.push("/cotizacion/create");
    },
    simulateProgress(number) {
      // we set loading state
      this[`loading${number}`] = true;
      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        this[`loading${number}`] = false;
      }, 3000);
    },
    showLoading() {
      this.$q.loading.show();
      // hiding in 2s
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.timer = void 0;
      }, 1000);
    }
  },
  async mounted() {
    await this.registros();
  },
  beforeDestroy() {
    if (this.timer !== void 0) {
      clearTimeout(this.timer);
      this.$q.loading.hide();
    }
  }
};
</script>
