<template>
  <v-dialog
      :value="isShown"
      @input="$emit('toggleVisibility', $event)"
      :persistent="locked"
  >
    <v-card>
      <v-progress-linear
        v-if="progress && progress.inProgress"
        :value="progressPercent"
      >
      </v-progress-linear>
      <v-card-title v-text="title"></v-card-title>
      <v-card-text>
        <v-form
            v-model="valid"
        >
          <v-alert
              v-for="(alert, i) of alerts"
              :key="i"
              color="warning"
              v-text="alert"
          ></v-alert>
          <v-text-field
              v-for="field of fields"
              :key="field.name"
              :label="field.label"
              :rules="field.rules"
              :placeholder="field.placeholder"
              v-model="values[field.name]"
              required
              :readonly="field.readonly"
              :autofocus="field.autofocus"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            plain
            @click.stop="closeDialog"
            :disabled="locked"
        >
          Cancel
        </v-btn>
        <v-btn
            plain
            color="primary"
            @click.stop="$emit('form_save', values)"
            :disabled="locked || !valid"
            v-text="acceptActionTitle ?? 'Accept'"
        >
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {useAuthStore} from "@/store/authStore";

export default {
  name: "GenericDialog",
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  model: {
    prop: 'isShown',
    event: 'toggleVisibility'
  },
  props: {
    isShown: {
      type: Boolean,
      required: true
    },
    onShow: {
      type: Function,
      required: false
    },
    acceptActionTitle: String,
    title: {
      type: String,
      required: true
    },
    startingValues: Object,
    fields: {
      type: Array,
    //  label: String,
    //  name: String
    //   placeholder: String,
    //   readonly: Boolean,
    //   autofocus: Boolean,
    //   rules: {
    //     type: Array,
    //     default: () => [
    //       value => !!value
    //     ]
    //   }
    }
  },
  data: () => ({
    valid: false,
    alerts: [],
    values: {},
    locked: false,
    progress: {
      inProgress: false,
      progress: 0,
      total: 0
    }
  }),
  methods: {
    closeDialog: function() {
      this.reset();
      this.$emit('toggleVisibility', false);
    },
    reset: function () {
      this.locked = false;
      this.alerts = [];
      this.fieldValue = "";
    }
  },
  computed: {
    progressPercent: function() {
      if (this.progress === undefined || this.progress.inProgress === false)
        return 0;
      return Math.round(this.progress.progress / this.progress.total * 100);
    }
  },
  watch: {
    isShown: function(newValue, oldValue) {
      if (this.onShow && !oldValue && newValue) this.onShow(this);
    },
    startingValues: {
      immediate: true,
      handler: function(newValue) {
        // Update values if dialog is not currently shown
        if (!this.isShown)
          this.values = newValue;
      }
    }
  }
}
</script>

<style scoped>

</style>