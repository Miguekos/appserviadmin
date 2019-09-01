# Quasar App (appwebquasar)

A Quasar Framework app

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).


PLantilla:
<template>
  <q-page padding>
    <q-card class="my-card">
      <q-item>
        <q-item-section>
          <q-item-label>Cotizacion</q-item-label>
          <q-item-label caption>Requerimientos</q-item-label>
        </q-item-section>
      </q-item>

      <TablaListado />
    </q-card>
  </q-page>
</template>

<script>
export default {
  components: {
    TablaListado: () => import("./TablaListado")
  }
  // name: 'PageName',
};
</script>

<style></style>
