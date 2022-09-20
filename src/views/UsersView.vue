<template>
  <v-container>
    <user-list-view
      :users="users"
      @open_user="editUser($event)"
    >
    </user-list-view>
    <generic-dialog
        v-model="userDialogShown"
        :fields="userEdit.fields"
        :starting-values="userEdit.values"
        title="Редактирование аккаунта"
        @form_save="formSave"
    >
    </generic-dialog>
  </v-container>
</template>

<script>
import {useAuthStore} from "@/store/authStore";
import UserListView from "@/components/UserListView";
import GenericDialog from "@/components/GenericDialog";

export default {
  name: "UsersView",
  components: {UserListView, GenericDialog},
  data: () => ({
    users: [],
    userDialogShown: false,
    userEdit: {
      fields: [
        {
          label: 'Имя',
          name: 'name',
          autofocus: true,
          rules: [
            value => !!value
          ]
        },
        {
          label: 'Фамилия',
          name: 'surname',
          rules: [
            value => !!value
          ]
        },
      ],
      values: {
        name: "",
        surname: "",
        id: -1
      }
    }
  }),
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  methods: {
    editUser: function(user) {
      console.log(user);
      this.userEdit.values.name = user.name;
      this.userEdit.values.surname = user.surname;
      this.userEdit.values.id = user.id;
      this.userDialogShown = true;
    },
    formSave: async function(values) {
      try {
        this.authStore.userRequestController.updateUser(values.id, values.name, values.surname);
      } catch (e) {
        console.log(e);
      }
      const userObject = this.users.find((user) => user.id === values.id);
      userObject.name = values.name;
      userObject.surname = values.surname;
      this.userDialogShown = false;
    }
  },
  beforeMount() {
    this.authStore.userRequestController.getUsers()
        .then((data) => this.users = data);
  }
}
</script>

<style scoped>

</style>