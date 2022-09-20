<template>
  <v-container class="pt-5">
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Регистрация нового пользователя</v-card-title>
          <v-card-text>
            <v-form
                ref="form"
                v-model="valid"
            >
              <template v-if="alert">
                <v-alert dense v-for="(error, i) of alert.errors" :key="i" :type="alert.success ? 'success' : 'warning'">
                  {{error}}
                </v-alert>
              </template>
              <v-text-field
                  class="input--fix-autofill"
                  v-model="login"
                  label="Логин"
                  :rules="validation.fieldRules"
                  required
                  autocomplete="login"
              >
              </v-text-field>
              <v-text-field
                  class="input--fix-autofill"
                  v-model="name"
                  label="Имя"
                  :rules="validation.fieldRules"
                  required
                  autocomplete="surname"
              >
              </v-text-field>
              <v-text-field
                  class="input--fix-autofill"
                  v-model="surname"
                  label="Фамилия"
                  :rules="validation.fieldRules"
                  required
                  autocomplete="surname"
              >
              </v-text-field>
              <v-text-field
                  class="input--fix-autofill"
                  v-model="password"
                  label="Пароль"
                  :rules="validation.fieldRules"
                  :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="passwordVisible ? 'text' : 'password'"
                  @click:append="passwordVisible = !passwordVisible"
                  required
                  autocomplete="password"
              >
              </v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn
                :loading="loading"
                plain
                color="primary"
                :disabled="!valid"
                @click="register"
            >
              Создать
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {useAuthStore} from "@/store/authStore";

// TODO: Reduce duplicated code
export default {
  name: "RegisterUserView",
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  data: () => ({
    valid: false,
    passwordVisible: false,
    name: "",
    surname: "",
    login: "",
    password: "",
    alert: null,
    loading: false,
    validation: {
      fieldRules: [v => !!v || 'Field is required'],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    }
  }),
  methods: {
    register: async function() {
      this.loading = true;
      try {
        await this.authStore.userRequestController.createUser(this.login, this.password, this.name, this.surname);
      } catch (e) {
        this.alert = e;
      }
      this.$router.push('/users/');
      this.loading = false;
    },
  },
  // Ugly fix for overlap of labels and autofill (https://stackoverflow.com/a/73633659/8244160)
  // TODO: replace with one based on animation event
  mounted() {
    setTimeout(() => {
      const els = document.querySelectorAll("input:-webkit-autofill")
      els.forEach((el) => {
        const label = el.parentElement.querySelector("label")
        label.classList.add("v-label--active")
      })
    }, 100)
  },
}
</script>

<!--suppress CssInvalidPseudoSelector -->
<style scoped>
/* Fix bg color on autocomplete. deep selector allows styles to be applied to inputs inside v-text-field */
.input--fix-autofill:deep(input:-webkit-autofill),
.input--fix-autofill:deep(input:-webkit-autofill:hover),
.input--fix-autofill:deep(input:-webkit-autofill:focus),
.input--fix-autofill:deep(input:-webkit-autofill:active) {
  transition: background-color 0s ease-in-out 500000s;
}
</style>