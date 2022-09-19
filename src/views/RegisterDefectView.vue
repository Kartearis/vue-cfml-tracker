<template>
  <v-container class="pt-5">
    <v-card>
      <v-card-title>
        Регистрация дефекта
      </v-card-title>
      <v-card-text>
        <defect-form
          :error="error"
          state="add"
          modified="false"
          @change="handleFormChange"
          @form_save="formSave"
        >
        </defect-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import DefectForm from "@/components/defectForm";
import {useAuthStore} from "@/store/authStore";
export default {
  name: "RegisterDefectView",
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  components: {DefectForm},
  data: ()=>({
    valid: false,
    error: {
      created_by: {
        surname: "",
        id: 0,
        name: ""
      },
      urgency: {
        id: 0,
        name: ""
      },
      created_at: "2022-09-18T00:00:00Z",
      description: "",
      state: {
        id: 0,
        name: ""
      },
      id: 0,
      level: {
        id: 0,
        name: ""
      },
      shortDescription: ""
    },
  }),
  methods: {
    handleFormChange: function(field, value) {
      if (this.errorBackup === null) this.errorBackup = structuredClone(this.error);
      if (this.error[field]?.id !== undefined)
        this.error[field].id = value;
      else this.error[field] = value;
    },
    formSave: async function() {
      const result = await this.authStore.userRequestController.createError(this.error);
      this.$router.push(`/errors/${result}`);
    }
  }
}
</script>

<style scoped>

</style>