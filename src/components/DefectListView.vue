<template>
  <v-list subheader>

    <v-list-item-group :value="selection.error" @change="updateSelection($event)">
      <v-data-iterator
        :items="errors"
        :search="dataIterator.search"
        :sort-by="dataIterator.sortBy"
        :sort-desc="dataIterator.sortDesc"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar
              dark
              color="primary"
              class="mb-1"
          >
            <v-text-field
                v-model="dataIterator.search"
                clearable
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Поиск"
            ></v-text-field>
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer></v-spacer>
              <v-select
                  v-model="dataIterator.sortBy"
                  flat
                  solo-inverted
                  hide-details
                  :items="dataIterator.keys"
                  prepend-inner-icon="mdi-magnify"
                  label="Сортировать"
              ></v-select>
              <v-spacer></v-spacer>
              <v-btn-toggle
                  v-model="dataIterator.sortDesc"
                  mandatory
              >
                <v-btn
                    large
                    depressed
                    color="blue"
                    :value="false"
                >
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn
                    large
                    depressed
                    color="blue"
                    :value="true"
                >
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-toolbar>
        </template>

        <template v-slot:default="props">
          <v-list-item

              v-for="error of props.items"
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
                {{ buildErrorSubtitle(error) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>

      </v-data-iterator>

    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "DefectListView",
  data: () => ({
    selection: {
      error: null,
    },
    dataIterator: {
      search: "",
      sortBy: "",
      keys: [
        { value: 'id', text: 'Номер дефекта'},
        { value: 'shortDescription', text: 'Описание'},
        { value: 'created_at', text: 'Дата создания'},
        { value: 'created_by.name', text: 'Автор'},
        { value: 'state.id', text: 'Статус'},
        { value: 'level.id', text: 'Критичность'},
        { value: 'urgency.id', text: 'Срочность'},
      ],
      sortDesc: false
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
        "1": "red lighten-2",
        "2": "orange lighten-2",
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
      this.selection.error = undefined;
    }
  }
}
</script>

<style scoped>
  .defect-list-item__title {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
    align-items: center;
  }
</style>