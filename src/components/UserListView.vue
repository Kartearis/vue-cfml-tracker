<template>
  <v-list subheader>
    <v-subheader>Пользователи</v-subheader>
    <v-list-item-group :value="selection.user" @change="updateSelection($event)">
      <v-list-item
          v-for="user of users"
          :key="user.id"
          v-on="$listeners"
      >
        <v-list-item-avatar>
          <v-icon> mdi-account </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ user.surname + " " + user.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ user.login }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "UserListView",
  data: () => ({
    selection: {
      user: null,
    },

  }),
  props: {
    users: Array
  },
  methods: {
    updateSelection: function (value) {
      this.selection.user = value;
      this.$emit('open_user', this.users[this.selection.user]);
      this.$nextTick(() => this.selection.user = undefined);
    }
  }
}
</script>

<style scoped>

</style>