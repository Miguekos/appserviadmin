<template>
  <div>
    <!-- <q-page padding> -->
    <q-card class="my-card">
      <q-item class="bg-custom4">
        <q-item-section>
          <q-item-label>Registrar</q-item-label>
          <q-item-label caption>REQUERIMIENTO DE COTIZACIÓN</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section class="flex-center flex">
          <q-select
            filled
            dense
            v-model="model"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="options"
            @filter="filterFn"
            hint="Buscar por nombre de cliente"
            style="width: 250px; padding-bottom: 32px"
            option-value="no_client"
            option-label="no_client"
            @input="input2"
            auto-select
          />
          <!-- <div>
          Autocomplete:-->
          <!-- <p class="text-primary">{{ model }}</p> -->
          <!-- </div> -->
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section class="flex-center flex">
          <q-form @submit.prevent="onSubmit" class>
            <div class="row flex flex-center">
              <div class="q-pa-xs col-xs-12 col-sm-6">
                <q-input
                  dense
                  filled
                  v-model="model.date"
                  mask="date"
                  :rules="['date']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="model.date"
                          @input="() => $refs.qDateProxy.hide()"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="q-pa-xs col-xs-12 col-sm-6">
                <q-input
                  dense
                  filled
                  v-model="model.no_client"
                  label="Cliente"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'No puede dejar el campo vacio'
                  ]"
                />
              </div>
              <div class="q-pa-xs col-xs-12 col-sm-6">
                <q-select
                  filled
                  dense
                  options-dense
                  v-model="no_direcc"
                  :options="getClieDireccion"
                  option-value="co_direcc"
                  option-label="no_direcc"
                  option-disable="inactive"
                  emit-value
                  map-options
                  label="Direccion"
                />
              </div>
              <div class="q-pa-xs col-xs-12 col-sm-6">
                <q-select
                  filled
                  dense
                  options-dense
                  v-model="contacto"
                  :options="getClieContactos"
                  option-value="co_percon"
                  option-label="no_percon"
                  option-disable="inactive"
                  emit-value
                  map-options
                  label="Contacto"
                />
              </div>
              <div class="q-pa-xs col-xs-12 col-sm-12">
                <q-input
                  dense
                  filled
                  v-model="model.asunto"
                  label="Asunto"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'No puede dejar el campo vacio'
                  ]"
                />
              </div>
            </div>
            <div class="q-pa-xs">
              <div class="q-pa-xs col-xs-12 col-sm-2">
                <q-input
                  v-model="model.text"
                  filled
                  type="textarea"
                  label="Detalle"
                />
              </div>
            </div>
            <div class="flex flex-center">
              <q-btn
                size="sm"
                glossy
                label="Registrar"
                :loading="loading1"
                type="submit"
                color="primary"
              />
              <q-btn
                size="sm"
                glossy
                label="Cerrar"
                color="primary"
                flat
                @click="dialogCreate(false)"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-item-section>
      </q-item>
    </q-card>
    <!-- {{ options }} -->
    <!--    {{ model }}-->
    <!--    {{ getClieDireccion }}-->
    <!--    {{ getClieContactos }}-->
    <!--    {{ contacto }}-->
    <!--    {{ no_direcc }}-->
    <!-- {{ name }} -->
    <!-- </q-page> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("clientes", [
      "ClientesFiltro",
      "asdClientes",
      "getClieDireccion",
      "getClieContactos"
    ])
  },
  data() {
    return {
      idCliente: null,
      loading: false,
      loading1: false,
      name: "",
      dni: "",
      selectModel: "",
      selectModel2: null,
      text: "",
      contacto: "",
      no_direcc: "",
      model: {
        text: "",
        date: "",
        no_client: "",
        no_corele: "",
        nu_docide: "",
        nu_telefono: ""
      },
      lotrOpts: [],
      options: [],
      optionsContactos: [],
      notif: () => {}
    };
  },
  methods: {
    ...mapActions("clientes", [
      "getClientes",
      "contactoCliente",
      "direccionCliente"
    ]),
    ...mapActions("example", [
      "registrarCotizacion",
      "dialogCreate",
      "registros"
    ]),
    filterFn(val, update, abort) {
      const asd = this.lotrOpts;
      if (val.length < 1) {
        abort();
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options = asd.filter(v =>
          v.no_client.toLowerCase().includes(needle)
        );
      });
    },
    async input2(val) {
      this.notif();
      this.notif = this.$q.notify({
        message: `Cliente: ${JSON.stringify(val.no_client)} seleccionado.`,
        timeout: 1000,
        color: "secondary"
      });
      this.idCliente = val.co_client;
      await this.contactoCliente(val.co_client)
        .then(() => {
          console.log("Cargo Contactos Correctamente");
        })
        .catch(err => {
          console.log(err);
        });
      await this.direccionCliente(val.co_client)
        .then(() => {
          console.log("Cargo Direccion Correctamente");
        })
        .catch(err => {
          console.log(err);
        });
    },
    async onSubmit() {
      this.loading = true;
      this.loading1 = true;
      this.registrarCotizacion({
        ...this.model,
        contacto: this.contacto,
        direccion: this.no_direcc,
        idcliente: this.idCliente
      })
        .then(resp => {
          console.log(resp);
          this.$q.notify({
            color: "green-5",
            textColor: "white",
            icon: "fas fa-check",
            message: "Se registro la cotizacion correctamente"
          });
          this.registros().then(response => {
            console.log(response);
            // this.dialogCreate(false);
            // this.loading1 = false;
          });
          // this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "fas fa-exclamation-triangle",
            message: "Se produjo un error al tratar de registrar"
          });
        })
        .finally(() => {
          this.loading1 = false;
          this.loading = false;
          this.dialogCreate(false);
        });
    },
    async filterFnNew(val, update, abort) {
      console.log(val);
      console.log(abort);
      console.log(update);
      console.log(this.idCliente);
      // if (this.optionsContactos !== null) {
      //
      //   // already loaded
      //   update();
      //   return;
      // }

      // setTimeout(() => {
      // update(async () => {
      //   console.log(val.co_client);
      //   await this.contactoCliente(val.co_client).then(() => {
      //     this.optionsContactos = this.getClieDireccion;
      //   });
      //   await this.direccionCliente(val.co_client);
      // });
      // }, 2000);
    },

    abortFilterFn() {
      // console.log('delayed filter aborted')
    }
  },
  async created() {
    // this.$q.loading.show();
    await this.getClientes();
    this.options = await this.asdClientes;
    this.lotrOpts = await this.asdClientes;
    // this.$q.loading.hide();
  }
};
</script>
