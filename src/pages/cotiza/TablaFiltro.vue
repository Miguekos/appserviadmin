<template>
  <div class="full-width">
    <div>
      <div>
        <p class="bg-grey-4 text-center text-subtitle1">Filtros Dinamicos</p>
      </div>
      <div class="q-ma-md">
        <q-input
          dense
          standout
          v-model="fechainicio"
          type="date"
          prefix="Fecha ini:   "
        >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-input>
      </div>
      <div class="q-ma-md">
        <q-input
          dense
          standout
          v-model="fechafin"
          type="date"
          prefix="Fecha fin:   "
        >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-input>
      </div>
      <div class="q-ma-md">
        <q-select
          transition-show="flip-up"
          transition-hide="flip-down"
          :options="registrosFiltroEstados"
          standout
          placeholder="Estado"
          dense
          outlined
          v-model="text"
        />
      </div>
    </div>
    <div class="q-pa-md flex flex-center">
      <q-btn class="bg-secondary" @click="showLoading()" label="Filtrar" />
    </div>
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
      text: "",
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
