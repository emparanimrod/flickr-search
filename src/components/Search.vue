<template>
  <div class="bg-gray-100">
    <div
      class="
        container
        mx-auto
        lg:py-10
        flex
        justify-center
        items-center
        px-4
        sm:px-6
        lg:px-4
      "
    >
      <div class="relative">
        <input
          type="text"
          class="
            h-14
            w-96
            pr-8
            pl-5
            rounded
            z-0
            focus:shadow
            focus:outline-none
          "
          placeholder="Search here"
          v-model="searchTerm"
          @keyup.enter="search"
        />
        <div class="absolute top-4 right-3">
          <i
            @click="search"
            class="fa fa-search text-gray-400 z-20 hover:text-blue-700"
            >Search</i
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  methods: {
    search() {
      this.$store.dispatch("getPhotos", this.searchTerm);
      this.$store.dispatch("getRelatedTags", this.searchTerm);
    },
  },
  computed: {
    searchTerm: {
      get() {
        return this.$store.state.searchTerm;
      },
      set(value) {
        this.$store.dispatch("setSearchTerm", value);
      },
    },
  },
  mounted() {
    // this.$store.dispatch("getPhotos", "music");
  },
};
</script>

<style scoped>
.fa-search {
  cursor: pointer;
}
</style>
