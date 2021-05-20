<template>
  <div class="home">
    <Search />
    <Related />
    <Photos />
  </div>
</template>

<script>
// @ is an alias to /src
import Search from "@/components/Search.vue";
import Related from "@/components/Related.vue";
import Photos from "@/components/Photos.vue";

export default {
  name: "Home",
  components: {
    Search,
    Related,
    Photos,
  },
};
</script>
