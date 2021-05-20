<template>
  <div v-if="loading" class="lg:py-6 inline-flex">
    <img class="w-10" src="../assets/loader.gif" alt="" />
    <h3 class="mr-6 pt-2">Loading</h3>
    <button
      class="
        bg-red-500
        hover:bg-red-700
        text-white
        font-bold
        py-2
        px-4
        rounded-full
      "
      @click="cancel"
    >
      Cancel Search
    </button>
  </div>
  <div class="align-middle lg:py-6 lg:px-4">
    <h6 class="mb-4">Related Searches</h6>
    <div class="inline-flex overflow-x-auto">
      <button
        v-for="tag in related.slice(0, 10)"
        :key="tag._content"
        class="
          bg-blue-500
          mx-4
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          px-4
          rounded-full
        "
      >
        {{ tag._content }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Related",
  computed: {
    loading() {
      return this.$store.state.isLoading;
    },
    related() {
      return this.$store.state.related;
    },
  },
  methods: {
    cancel() {
      this.$store.dispatch("cancelRequest");
    },
  },
};
</script>

<style></style>
