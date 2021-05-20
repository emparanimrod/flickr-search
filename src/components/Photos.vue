<template>
  <div class="container mx-auto">
    <div :key="photo.id" v-for="photo in photos" class="item">
      <Tooltip position="top" :tooltipText="'custom text'">
        <div
          @mouseover="getDate(photo.id)"
          @mouseleave="clearDate"
          :style="{
            background: `url(https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg)`,
          }"
        ></div>
      </Tooltip>
    </div>
  </div>
</template>

<script>
import Tooltip from "@/components/Tooltip.vue";

export default {
  name: "Related",
  components: {
    Tooltip,
  },
  computed: {
    photos() {
      return this.$store.state.photos;
    },
    date() {
      return this.$store.state.photoDate;
    },
  },
  methods: {
    getDate(id) {
      this.$store.dispatch("getPhotoUploadTime", id);
    },
    clearDate() {
      this.$store.dispatch("clearPhotoUploadTime");
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
  background-repeat: no-repeat;
  background-size: cover !important;
}

.container .item div:hover {
  transform: scale(1.02);
  transition: 600ms ease-in;
}
</style>
