<template>
  <div class="full-width">
    <div>
      <div>
        <p class="bg-secondary shadow-5 text-center text-white text-subtitle1">
          Registro
        </p>
      </div>
      <div class="q-ma-sm">
        <q-input dense v-model="date" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  dense
                  v-model="date"
                  @input="() => $refs.qDateProxy.hide()"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="q-ma-sm">
        <q-input dense v-model="time" mask="time" :rules="['time']">
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
        <q-input dense v-model="direccion" label="Direccion" />
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
      <q-btn @click="showLoading()" label="Grabar" size="sm" color="positive" />
      <q-btn label="Sin Contacto" size="sm" color="negative" />
      <q-btn
        label="Cerrar"
        @click="dialogRegistrarCitaCliente(false)"
        size="sm"
        color="secondary"
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
      time: "10:56",
      direccion: "",
      date: "2019/02/01",
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
    ...mapActions("example", ["registros", "dialogRegistrarCitaCliente"]),
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
