<template>
    <div class="sysLayout">
      <app-head/>
      <router-view />
    </div>
</template>

<script>
  import { AppHead } from './components'


    export default {
      name: "topLayout",
      components: {
        AppHead
      },
    }
</script>

