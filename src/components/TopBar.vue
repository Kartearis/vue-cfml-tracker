<template>
  <v-app-bar app
             color="primary"
             dark
  >
    <slot name="nav"></slot>
    <div class="d-flex align-center">

      <v-toolbar-title class="text-h6 text-md-h4 text-xl-h3">CFML Defect Tracker</v-toolbar-title>
    </div>
    <v-spacer></v-spacer>

    <v-spacer></v-spacer>
    <user-menu></user-menu>
  </v-app-bar>
</template>

<script>
import UserMenu from "@/components/UserMenu";

export default {
  name: "TopBar",
  components: {UserMenu}
}
</script>

<style scoped>

</style>