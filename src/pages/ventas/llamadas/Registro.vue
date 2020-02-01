<template>
  <div class="full-width">
    <q-form @submit.stop="registrar" @reset="onReset" class="q-gutter-md">
      <div>
        <div>
          <p class="bg-secondary   shadow-5 text-center text-white">
            Registro
          </p>
        </div>
        <div class="q-ma-sm">
          <q-input dense filled v-model="date" mask="####-##-##">
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
          <q-select
            label="Estado"
            required="true"
            filled
            dense
            options-dense
            v-model="codigoSeguimientoVentaVar"
            :options="getlistar_estado_seguimiento"
            option-label="no_estsve"
            option-value="co_estsve"
            map-options
            emit-value
            transition-show="flip-up"
            transition-hide="flip-down"
          />
        </div>
        <div class="q-ma-sm">
          <q-input
            required="true"
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
        <q-btn
          @click="sinContactos()"
          :loading="loadboton"
          :disable="loadboton"
          label="No Contesta"
          size="sm"
          color="negative"
        />
        <q-btn label="Cerrar" @click="reset()" size="sm" color="secondary" />
        <q-btn label="Reporte" @click="reporte()" size="sm" color="info" />
      </div>
    </q-form>
    <!--    {{ $data }}-->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { date } from "quasar";
let timeStamp = Date.now();
export default {
  props: ["clienteR", "contactoR"],
  computed: {
    ...mapGetters("example", [
      "registrosFiltroEstados",
      "getlistar_estado_seguimiento"
    ])
  },
  data() {
    return {
      loadboton: false,
      loadboton2: false,
      codigoSeguimientoVentaVar: null,
      codigoSeguimientoVenta: [],
      text: "",
      date: " ",
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
      "dialogLlamadaCliente",
      "mantenimiento_seguimiento_cliente",
      "listar_seguimientos_registrados",
      "seguimiento_cliente"
    ]),
    reporte() {
      console.log("Reporte Futuro");
    },
    reset() {
      this.dialogLlamadaCliente({
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
    sinContactos() {
      this.loadboton = true;
      let formattedString = date.formatDate(timeStamp, "YYYY-MM-DD");
      const data = {
        cliente: this.clienteR,
        contacto: this.contactoR,
        codigoSeguimientoVenta: "1",
        comentario: "Automatico",
        fechaSeguimiento: formattedString
      };
      console.log(data);
      this.mantenimiento_seguimiento_cliente({ ...data })
        .then(resp => {
          console.log(resp);
          this.$q.notify({
            color: "positive",
            message: "Registro Correcto sin contacto"
          });
          this.loadboton = true;
          this.codigoSeguimientoVentaVar = null;
          this.date = "";
          this.text = "";
          this.listar_seguimientos_registrados({
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
    registrar() {
      this.loadboton = true;
      const data = {
        cliente: this.clienteR,
        contacto: this.contactoR,
        codigoSeguimientoVenta: this.codigoSeguimientoVentaVar,
        comentario: this.text,
        fechaSeguimiento: this.date
      };
      console.log(data);
      this.mantenimiento_seguimiento_cliente({ ...data })
        .then(resp => {
          console.log(resp);
          this.$q.notify({
            color: "positive",
            message: "Registro Correcto"
          });
          this.codigoSeguimientoVentaVar = null;
          this.date = "";
          this.text = "";
          this.listar_seguimientos_registrados({
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
  async created() {
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
