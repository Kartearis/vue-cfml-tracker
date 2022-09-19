<template>
  <v-list subheader>
    <v-subheader>Ошибки</v-subheader>
    <v-list-item-group :value="selection.error" @change="updateSelection($event)">
      <v-list-item
          v-for="error of errors"
          :key="error.id"
          v-on="$listeners"
      >
        <v-list-item-avatar>
          <v-icon> mdi-sticker </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="defect-list-item__title">
            {{ buildErrorTitle(error) }}
            <v-chip
              :color="getStateColor(error.state)"
              x-small
            >
              {{ error.state.name }}
            </v-chip>
            <v-chip
              :color="getLevelColor(error.level)"
              x-small
            >
              {{ error.level.name }}
            </v-chip>
            <v-chip
                :color="getUrgencyColor(error.urgency)"
                x-small
            >
              {{ error.urgency.name }}
            </v-chip>
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-icon> mdi-user </v-icon> {{ buildErrorSubtitle(error) }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "DefectListView",
  data: () => ({
    selection: {
      error: null
    }
  }),
  props: {
    errors: Array
  },
  methods: {
    getStateColor: function(state) {
      const colors = {
        "1": "light-blue lighten-2",
        "2": "orange lighten-2",
        "3": "green lighten-2",
        "4": "grey lighten-2"
      };
      return colors[state.id];
    },
    getLevelColor: function(level) {
      const colors = {
        "1": "orange lighten-2",
        "2": "red lighten-2",
        "3": "light-blue lighten-2",
        "4": "green lighten-2"
      };
      return colors[level.id];
    },
    getUrgencyColor: function(urgency) {
      const colors = {
        "1": "red lighten-2",
        "2": "orange lighten-2",
        "3": "light-blue lighten-2",
        "4": "green lighten-2"
      };
      return colors[urgency.id];
    },
    buildErrorTitle: function(error) {
      return `#${error.id} - ${error.shortDescription}`;
    },
    buildErrorSubtitle: function(error) {
      return `${error.created_by.surname} ${error.created_by.name[0]}. (${new Date(error.created_at).toLocaleString()})`;
    },
    updateSelection: function (value) {
      this.selection.error = value;
      this.$emit('open_error', this.errors[this.selection.error]);
      this.selection.error = null;
    }
  }
}
</script>

<style scoped>
  .defect-list-item__title {
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
  }
</style>