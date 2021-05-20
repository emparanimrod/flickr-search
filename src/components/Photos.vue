<template>
  <div class="container">
    <div :key="photo.id" v-for="photo in photos" class="item">
      <div
        :style="{
          background: `url(https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg)`,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Related",
  computed: {
    photos() {
      return this.$store.state.photos;
    },
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  column-gap: 1em;
  row-gap: 1.2em;
}
.container .item {
  width: 100%;
  height: 300px;
  /* background-color: red; */
}
.container .item div {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: red;
  /* background-repeat: no-repeat;
        background-size: cover !important; */
}

.container .item div:hover {
  transform: scale(1.02);
  transition: 600ms ease-in;
}
</style>
