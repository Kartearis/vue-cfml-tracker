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
import {useAuthStore} from "@/store/authStore";
export default {
  name: "DefectView",
  components: {DefectListView},
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  data: () => ({
    errors: []
  }),
  methods: {
    openError: function(error) {
      if (error)
        this.$router.push(`/errors/${error.id}`);
    }
  },
  beforeMount() {
    this.authStore.userRequestController.getDefects()
      .then((data) => this.errors = data);
  }
}
</script>

<style scoped>

</style>