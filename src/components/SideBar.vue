<template>
  <v-navigation-drawer app
        :value="drawer"
        @input="updateDrawer"
  >
    <app-navigation
      :items="navItems"
    ></app-navigation>
  </v-navigation-drawer>
</template>

<script>
import AppNavigation from "@/components/Navigation";
export default {
  name: "SideBar",
  components: {AppNavigation},
  model: {
    prop: "drawer"
  },
  props: {
    drawer: {
      type: Boolean,
      default: null,
    }
  },
  methods: {
    updateDrawer: function(event) {
      this.$emit('input', event);
    }
  },
  data: () => ({
    navItems: [
      {
        icon: 'mdi-list-box',
        text: 'Ошибки',
        path: "/"
      },
      {
        icon: 'mdi-clipboard-plus',
        text: 'Новая ошибка',
        path: "/errors/new"
      },
      {
        icon: 'mdi-account-multiple',
        text: 'Пользователи',
        path: "/users"
      },
      {
        icon: 'mdi-account-plus',
        text: 'Новый пользователь',
        path: "/users/new"
      }
    ]
  })
}
</script>

<style scoped>

</style>