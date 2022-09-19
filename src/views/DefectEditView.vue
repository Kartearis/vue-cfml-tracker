<template>
  <v-container>
    <v-toolbar dense>
      <v-toolbar-title>Дефект #{{ error.id }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn-toggle
          v-model="stateId"
          group
          mandatory
      >
        <v-btn>
          <v-icon>
            mdi-eye
          </v-icon>
        </v-btn>
        <v-btn>
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
      </v-btn-toggle >
    </v-toolbar>
    <v-row class="pt-5" v-if="alerts.length === 0">
      <v-col>
        <h3>Детали</h3>
        <defect-form
          :error="error"
          :state="state"
          :modified="errorBackup"
          @form_save="formSave"
          @form_rollback="formRollback"
          @change="handleFormChange"
          @comment_change="comment = $event"
        ></defect-form>
      </v-col>
      <v-col>
        <h3>История</h3>
        <v-list>
          <v-list-item
              v-for="event of events"
              :key="event.id"
          >
            <v-list-item-content>
              <v-list-item-title class="defect-list-item__title">
                <h4>{{ event.action.name }}</h4>
                <v-spacer></v-spacer>
                {{ buildEventAuthor(event) }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ event.comment }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-card class="mt-5" v-else>
      <v-card-title>Произошла ошибка!</v-card-title>
      <v-card-text>
        <v-alert dense color="orange ligten-2" v-for="(alert, i) of alerts" :key="i">
          {{ alert }}
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import DefectForm from "@/components/defectForm";
import {useAuthStore} from "@/store/authStore";

export default {
  name: "DefectEditView",
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  props: ['id'],
  components: {DefectForm},
  data: () => ({
    comment: "",
    stateId: 0,
    errorBackup: null,
    alerts: [],
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
    events: []
  }),
  computed: {
    state: function() {
      const states = {
        "0": 'view',
        "1": 'edit',
        "2": 'add'
      };
      return states[this.stateId];
    }
  },
  methods: {
    buildEventAuthor: function(event) {
      return `${event.user.surname} ${event.user.name[0]}. (${new Date(event.date).toLocaleString()})`;
    },
    handleFormChange: function(field, value) {
      if (this.errorBackup === null) this.errorBackup = structuredClone(this.error);
      if (this.error[field]?.id !== undefined)
        this.error[field].id = value;
      else this.error[field] = value;
    },
    formSave: function() {
      //this.authStore.userRequestController
      this.errorBackup = null;
    },
    formRollback: function() {
      this.error = this.errorBackup;
      this.errorBackup = null;
    }
  },
  beforeMount() {
    const controller = this.authStore.userRequestController;
    controller.getDefect(this.id)
      .then((data) => this.error = data)
      .catch((err) => this.alerts.push(err.response.data));
    controller.getDefectHistory(this.id)
      .then((data) => this.events = data)
      .catch((err) => this.alerts.push(err.response.data));
  }
}
</script>

<style scoped>
  .defect-list-item__title {
    display: flex;
    justify-content: space-between;
  }
</style>