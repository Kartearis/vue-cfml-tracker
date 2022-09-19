<template>
  <v-container>
    <defect-list-view
        :errors="errors"
        @open_error="openError($event)"
    >
    </defect-list-view>
  </v-container>
</template>

<script>
import DefectListView from "@/components/DefectListView";
export default {
  name: "DefectView",
  components: {DefectListView},
  data: () => ({
    errors: [
      {
        "created_by": {
          "surname": "DoeDoe",
          "id": 1,
          "name": "Jane"
        },
        "urgency": {
          "id": 1,
          "name": "Очень срочно"
        },
        "created_at": "2022-09-18T23:21:45Z",
        "description": "qwe",
        "state": {
          "id": 2,
          "name": "Открытая"
        },
        "id": 6,
        "level": {
          "id": 1,
          "name": "Авария"
        },
        "shortDescription": "qwe"
      },
      {
        "created_by": {
          "surname": "DoeDoe",
          "id": 1,
          "name": "Jane"
        },
        "urgency": {
          "id": 2,
          "name": "Срочно"
        },
        "created_at": "2022-09-18T19:37:43Z",
        "description": "qwe",
        "state": {
          "id": 2,
          "name": "Открытая"
        },
        "id": 1,
        "level": {
          "id": 2,
          "name": "Критичная ошибка"
        },
        "shortDescription": "qwe"
      },
      {
        "created_by": {
          "surname": "DoeDoe",
          "id": 1,
          "name": "Jane"
        },
        "urgency": {
          "id": 3,
          "name": "Не срочно"
        },
        "created_at": "2022-09-18T21:17:03Z",
        "description": "Long description",
        "state": {
          "id": 1,
          "name": "Новая"
        },
        "id": 5,
        "level": {
          "id": 4,
          "name": "Запрос изменения"
        },
        "shortDescription": "Test description"
      },
      {
        "created_by": {
          "surname": "DoeDoe",
          "id": 1,
          "name": "Jane"
        },
        "urgency": {
          "id": 3,
          "name": "Не срочно"
        },
        "created_at": "2022-09-18T21:14:28Z",
        "description": "Long description",
        "state": {
          "id": 1,
          "name": "Новая"
        },
        "id": 3,
        "level": {
          "id": 2,
          "name": "Критичная ошибка"
        },
        "shortDescription": "Test description"
      },
      {
        "created_by": {
          "surname": "DoeDoe",
          "id": 1,
          "name": "Jane"
        },
        "urgency": {
          "id": 3,
          "name": "Не срочно"
        },
        "created_at": "2022-09-18T21:14:17Z",
        "description": "Long description",
        "state": {
          "id": 1,
          "name": "Новая"
        },
        "id": 2,
        "level": {
          "id": 2,
          "name": "Критичная ошибка"
        },
        "shortDescription": "Test description"
      }
    ]
  }),
  methods: {
    openError: function(error) {
      this.$router.push(`/errors/${error.id}`);
    }
  }
}
</script>

<style scoped>

</style>