<template>
  <div class="full-width">
    <div>
      <div>
        <p class="bg-secondary dense shadow-5 text-center text-white">
          Filtros Dinamicos
        </p>
      </div>
      <div class="q-ma-md">
        <q-select
          ref="estadoFiltro"
          label="Estado"
          transition-show="flip-up"
          transition-hide="flip-down"
          :options="registrosFiltroEstados"
          option-value="co_estreq"
          option-label="no_estreq"
          option-disable="inactive"
          emit-value
          map-options
          placeholder="Estado"
          dense
          options-dense
          v-model="estadoFiltro"
        />
      </div>
      <div class="row justify-between q-ma-md">
        <q-input
          ref="date_ini"
          label="Fecha Inicio"
          dense
          filled
          v-model="date_ini"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date dense v-model="date_ini" v-close-popup />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          ref="date_end"
          label="Fecha Fin"
          dense
          filled
          v-model="date_end"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date dense v-model="date_end" v-close-popup />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <div class="row justify-around q-gutter">
      <q-btn
        color="secondary"
        @click="filtrar"
        icon-right="send"
        size="sm"
        label="Filtrar"
      />
      <q-btn
        color="orange"
        @click="Limpair"
        icon-right="close"
        size="sm"
        label="Limpiar"
      />
      <q-btn
        color="positive"
        @click="nuevo_reque()"
        icon-right="add"
        size="sm"
        label="Nuevo Requ."
      />
    </div>
    <!--    {{ $data }}-->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("example", ["registrosFiltroEstados"])
  },
  data() {
    return {
      date_ini: "",
      date_end: "",
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
    ...mapActions("example", ["registros", "dialogCreate"]),
    async Limpair() {
      await this.registros({
        p_co_estreq: "null",
        p_fe_inireq: "null",
        p_fe_finreq: "null"
      });
      this.estadoFiltro = "";
      this.date_ini = "";
      this.date_end = "";
      setTimeout(() => {
        this.$refs.estadoFiltro.resetValidation();
        this.$refs.date_ini.resetValidation();
        this.$refs.date_end.resetValidation();
      }, 1500);
    },
    async filtrar() {
      await this.registros({
        p_co_estreq: this.estadoFiltro,
        p_fe_inireq: this.date_ini,
        p_fe_finreq: this.date_end
      });
    },
    nuevo_reque() {
      console.log("Se preciono el boton");
      this.dialogCreate(true);
      // this.$router.push("/cotizacion/create");
      // this.$q.notify({
      //   color: "red",
      //   textColor: "white",
      //   message: "Por definir.!"
      // });
      console.log("Boron precinado");
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
    await this.registros({
      p_co_estreq: "null",
      p_fe_inireq: "null",
      p_fe_finreq: "null"
    });
  },
  beforeDestroy() {
    if (this.timer !== void 0) {
      clearTimeout(this.timer);
      this.$q.loading.hide();
    }
  }
};
</script>
