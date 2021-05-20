<template>
  <h1>Search Goes Here</h1>
</template>

<script>
export default {
  name: "Search",
  computed: {},
  mounted() {
    this.$store.dispatch("getPhotos", "flowers");
  },
};
</script>

<style></style>
