<template>
  <q-page padding>
    <q-card class="my-card">
      <q-item class="bg-custom4">
        <q-item-section>
          <q-item-label>Home</q-item-label>
          <q-item-label caption>Detalle / Global</q-item-label>
        </q-item-section>
      </q-item>
      <div class="q-pa-md">
        <q-parallax :height="200" :speed="0.5">
          <template v-slot:media>
            <img src="https://cdn.quasar.dev/img/parallax1.jpg" />
          </template>

          <h1 class="text-white">Home</h1>
        </q-parallax>
      </div>
    </q-card>
  </q-page>
</template>
