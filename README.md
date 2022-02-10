# unplugin-vue-script-name

[![NPM version](https://img.shields.io/npm/v/unplugin-vue-script-name?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-vue-script-name)

Support `<script name>` for Vue script setup.

## Install

```bash
npm i -D unplugin-vue-script-name
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import scriptName from "unplugin-vue-script-name/vite";

export default defineConfig({
  plugins: [
    scriptName({
      /* options */
    })
  ]
});
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import scriptName from "unplugin-vue-script-name/rollup";

export default {
  plugins: [
    scriptName({
      /* options */
    })
  ]
};
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require("unplugin-vue-script-name/webpack").default({
      /* options */
    })
  ]
};
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    [
      "unplugin-vue-script-name/nuxt",
      {
        /* options */
      }
    ]
  ]
};
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require("unplugin-vue-script-name/webpack").default({
        /* options */
      })
    ]
  }
};
```

<br></details>

## How It Works

```html
<!-- MyComponent.vue -->
<script setup lang="ts" name="MyComponent">
  defineProps({
    title: { type: String }
  });
</script>

<template>
  <h1>{{title}}</h1>
</template>
```

```html
<!-- Will be transformed to -->
<script>
  export default { name: "MyComponent" };
</script>

<script setup lang="ts">
  defineProps({
    title: { type: String }
  });
</script>

<template>
  <h1>{{title}}</h1>
</template>
```
