<template>
  <div class="full-width">
    <div>
      <div>
        <p class="bg-secondary shadow-5 text-center text-white text-subtitle1">
          Filtros
        </p>
      </div>
      <div class="q-ma-sm">
        <q-select
          transition-show="flip-up"
          transition-hide="flip-down"
          :options="registrosFiltroEstados"
          option-value="co_estreq"
          option-label="no_estreq"
          option-disable="inactive"
          emit-value
          map-options
          label="Estado"
          placeholder="Estado"
          dense
          v-model="estadoFiltro"
        />
      </div>
      <div class="q-ma-sm">
        <q-select
          transition-show="flip-up"
          transition-hide="flip-down"
          :options="registrosFiltroEstados"
          option-value="co_estreq"
          option-label="no_estreq"
          option-disable="inactive"
          emit-value
          map-options
          label="Sector Economico"
          placeholder="Sector Economico"
          dense
          v-model="estadoFiltro"
        />
      </div>

      <div class="q-ma-sm">
        <q-select
          transition-show="flip-up"
          transition-hide="flip-down"
          :options="registrosFiltroEstados"
          option-value="co_estreq"
          option-label="no_estreq"
          option-disable="inactive"
          emit-value
          map-options
          label="Semaforo"
          placeholder="Semaforo"
          dense
          v-model="estadoFiltro"
        />
      </div>
    </div>
    <div class="q-pa-xs flex flex-center">
      <q-btn
        @click="showLoading()"
        label="Filtrar"
        size="sm"
        color="positive"
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
    ...mapActions("example", ["registros"]),
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
