<template>
  <v-list
      nav
  >
    <v-subheader>Navigation</v-subheader>
    <v-list-item-group
        v-model="selectedItem"
        color="primary"
    >
      <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="deduplicatedNavigation(item.path)"
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import deduplicateNavMixin from "@/mixins/deduplicateNavMixin";

export default {
  name: "AppNavigation",
  mixins: [deduplicateNavMixin],
  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    checkDefaultPath: function(items) {
      const defaultNav = items.find((item) => item.path === this.$router.currentRoute.path);
      if (defaultNav)
        return items.indexOf(defaultNav);
      return null;
    }
  },
  data: () => ({
    selectedItem: null
  }),
  beforeMount() {
    this.selectedItem = this.checkDefaultPath(this.items);
  }
}
</script>

<style scoped>

</style>