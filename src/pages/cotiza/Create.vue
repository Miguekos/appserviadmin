<template>
  <div>
    <q-page padding>
      <q-card class="my-card">
        <q-item class="bg-custom4">
          <q-item-section>
            <q-item-label>Registrar</q-item-label>
            <q-item-label caption>Requerimientos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section class="flex-center flex q-pa-xs">
            <q-select
              filled
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
            <q-form @submit="onSubmit" @reset="onReset" class="q-pa-md">
              <div class="row flex flex-center q-pa-xs col-12">
                <div class="q-pa-sm col-xs-12 col-sm-2">
                  <q-input
                    dense
                    filled
                    v-model="model.no_client"
                    label="Nombre"
                    hint="Nombre"
                    lazy-rules
                  />
                </div>
                <div class="q-pa-sm col-xs-12 col-sm-2">
                  <q-input
                    dense
                    filled
                    v-model="model.no_corele"
                    label="Correo"
                    hint="Correo"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) ||
                        'No puede dejar el campo vacio'
                    ]"
                  />
                </div>
                <div class="q-pa-sm col-xs-12 col-sm-2">
                  <q-input
                    dense
                    filled
                    v-model="model.no_direcc"
                    label="Direccion"
                    hint="Direccion"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) ||
                        'No puede dejar el campo vacio'
                    ]"
                  />
                </div>
                <div class="q-pa-sm col-xs-12 col-sm-2">
                  <q-input
                    dense
                    filled
                    v-model="model.nu_docide"
                    label="Documento"
                    hint="Documento"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) ||
                        'No puede dejar el campo vacio'
                    ]"
                  />
                </div>
                <div class="q-pa-sm col-xs-12 col-sm-2">
                  <q-input
                    dense
                    filled
                    v-model="model.nu_telefono"
                    label="Telefono"
                    hint="Telefono"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) ||
                        'No puede dejar el campo vacio'
                    ]"
                  />
                </div>
              </div>
              <div class="q-pa-sm col-xs-12 col-sm-2">
                <div class="q-pa-md">
                  <q-input
                    v-model="text"
                    filled
                    type="textarea"
                    label="Descripcion"
                    hint="Descripcion"
                  />
                </div>
              </div>
              <div class="flex flex-center">
                <q-btn label="Registrar" type="submit" color="primary" />
                <q-btn label="Atras" color="primary" flat class="q-ml-sm" />
              </div>
            </q-form>
          </q-item-section>
        </q-item>
      </q-card>
      <!-- {{ options }} -->
      <!-- {{ model.no_client }} -->
      <!-- {{ name }} -->
    </q-page>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("clientes", ["ClientesFiltro", "asdClientes"])
  },
  data() {
    return {
      name: "",
      dni: "",
      selectModel: "",
      selectModel2: null,
      text: "",
      model: {
        no_client: "",
        no_corele: "",
        no_direcc: "",
        nu_docide: "",
        nu_telefono: ""
      },
      lotrOpts: [],
      options: [],
      notif: () => {}
    };
  },
  methods: {
    ...mapActions("clientes", ["getClientes"]),
    filterFn(val, update, abort) {
      const asd = this.lotrOpts;
      if (val.length < 1) {
        abort();
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        console.log("saasdasdasdasdasd");
        console.log(
          asd.filter(v => v.no_client.toLowerCase().includes(needle))
        );
        this.options = asd.filter(v =>
          v.no_client.toLowerCase().includes(needle)
        );
      });
    },
    input2(val) {
      this.notif();
      this.notif = this.$q.notify({
        message: `Cliente: ${JSON.stringify(val.no_client)} seleccionado.`,
        timeout: 1000,
        color: "positive"
      });
    },
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "fas fa-exclamation-triangle",
          message: "You need to accept the license and terms first"
        });
      } else {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "fas fa-check-circle",
          message: "Submitted"
        });
      }
    },

    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    }
  },
  async created() {
    await this.getClientes();
    this.options = await this.asdClientes;
    this.lotrOpts = await this.asdClientes;
  }
};
</script>
