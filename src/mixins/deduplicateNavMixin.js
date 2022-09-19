const deduplicateNavMixin = {
    methods: {
        deduplicatedNavigation: function(path) {
            if (this.$router.currentRoute.path !== path)
                this.$router.push(path);
        }
    }
}

export default deduplicateNavMixin;