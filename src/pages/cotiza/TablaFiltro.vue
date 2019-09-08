<template>
  <div class="full-width">
    <div>
      <div>
        <p class="q-ma-md text-center text-subtitle1">Filtros Dinamicos</p>
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
      <!-- {{ registrosFiltroEstados }} -->
      {{ model }}
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
      <q-btn color="white" text-color="black" label="Filtrar" />
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
    }
  },
  async created() {
    await this.registros();
    this.options = await this.registrosFiltroEstados();
  }
};
</script>
