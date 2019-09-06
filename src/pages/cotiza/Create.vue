<template>
  <q-page padding>
    <q-card class="my-card">
      <q-item class="bg-custom4">
        <q-item-section>
          <q-item-label>Home</q-item-label>
          <q-item-label caption>Detalle / Global</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="flex-center flex">
        <q-item-section>
          <template>
            <div class="q-pa-md">
              <div class="q-gutter-md row">
                <q-select
                  filled
                  v-model="model"
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  :options="options"
                  @filter="filterFn"
                  hint="Basic autocomplete"
                  style="width: 250px; padding-bottom: 32px"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
          </template>
        </q-item-section>
      </q-item>
    </q-card>
  </q-page>
</template>

<script>
const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];

export default {
  data() {
    return {
      model: null,
      options: stringOptions
    };
  },

  methods: {
    filterFn(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.options = stringOptions.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
      console.log(abort);
    }
  }
};
</script>
