<template>
  <v-form
    ref="form"
    v-model="valid"
  >
    <v-text-field
        :readonly="state === 'view'"
        label="Краткое описание"
        :value="error.shortDescription"
        :rules="rules.fieldRules"
        @input="fieldChange('shortDescription', $event)"
    ></v-text-field>
    <v-select
        :readonly="state === 'view'"
        :items="allowedStates"
        item-text="name"
        item-value="id"
        label="Статус"
        :value="error.state.id"
        :rules="rules.selectRules"
        @input="fieldChange('state', $event)"
    ></v-select>
    <v-select
        :readonly="state === 'view'"
        label="Критичность"
        :value="error.level.id"
        :items="levels"
        item-text="name"
        item-value="id"
        :rules="rules.selectRules"
        @input="fieldChange('level', $event)"
    ></v-select>
    <v-select
        :readonly="state === 'view'"
        label="Срочность"
        :value="error.urgency.id"
        :items="urgency"
        item-text="name"
        item-value="id"
        :rules="rules.selectRules"
        @input="fieldChange('urgency', $event)"
    ></v-select>
    <v-text-field
        readonly
        label="Автор"
        :value="`${error.created_by.surname} ${error.created_by.name}`"
    ></v-text-field>
    <v-text-field
        readonly
        label="Дата создания"
        :value="(new Date(error.created_at)).toLocaleString()"
    ></v-text-field>
    <v-textarea
        :readonly="state === 'view'"
        label="Подробное описание"
        :value="error.description"
        rows="1"
        auto-grow
        :rules="rules.fieldRules"
        @input="fieldChange('description', $event)"
    ></v-textarea>
    <v-textarea
        v-if="state === 'edit'"
        label="Комментарий к изменениям"
        v-model="comment"
        rows="1"
        auto-grow
        :rules="rules.fieldRules"
        @input="$emit('comment_change', $event)"
    ></v-textarea>
    <v-btn
      v-if="state !== 'view'"
      :disabled="!valid"
      plain
      color="primary"
      @click="$emit('form_save')"
    >Сохранить</v-btn>
    <v-btn
      v-if="state === 'edit' && modified"
      plain
      @click="$emit('form_rollback')"
    >Отменить</v-btn>
  </v-form>
</template>

<script>
import {useAuthStore} from "@/store/authStore";

export default {
  name: "defectForm",
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  // State is 'view', 'edit', or 'add'
  props: ['error', 'state', 'modified'],
  data: () => ({
    rules: {
      fieldRules: [v => !!v || 'Field is required'],
      selectRules: [
          v => !!v || 'Field is required',
          v => v > 0 || 'Value not selected'
      ]
    },
    comment: "",
    states: [],
    levels: [],
    urgency: [],
    valid: false,
    allowedStateTransitions: {
      0: [1],
      1: [1, 2],
      2: [2, 3],
      3: [2, 3, 4],
      4: [4]
    },
  }),
  methods: {
    fieldChange: function(field, value) {
      this.$emit('change', field, value);
    }
  },
  computed: {
    allowedStates: function() {
      const allowedStateIds = this.allowedStateTransitions[this.error.state.id];
      return this.states.filter((entry) => allowedStateIds.includes(entry.id));
    }
  },
  beforeMount() {
    const controller = this.authStore.userRequestController;
    controller.getDict('states')
      .then((data) => this.states = data);
    controller.getDict('levels')
        .then((data) => this.levels = data);
    controller.getDict('urgency')
        .then((data) => this.urgency = data);
  }
}
</script>

<style scoped>

</style>