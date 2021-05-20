import { createStore } from "vuex";
import axios from "axios";

// axios instance
const instance = axios.create({
  baseURL: "https://www.flickr.com/services/rest",
  timeout: 10 * 1000,
});

const state = {
  photos: [],
  related: [],
  isLoading: false,
};
const mutations = {
  SET_PHOTOS(state, photos) {
    state.photos = photos;
    state.isLoading = false;
  },

  SET_RELATED(state, related) {
    state.related = related;
  },

  SET_LOADING(state, loadingState) {
    state.isLoading = loadingState;
  },
};

const actions = {
  // get photos by search term
  getPhotos({ commit }, term) {
    commit("SET_LOADING", true);
    const url = `/?method=flickr.photos.search&api_key=${process.env.VUE_APP_API_KEY}&text=${term}&format=json&nojsoncallback=1`;
    // set loading state

    // make request
    instance.get(url).then((response) => {
      commit("SET_PHOTOS", response.data.photos.photo);
    });
  },

  // Get related tags based on search term

  getRelatedTags({ commit }, term) {
    // set loading state
    commit("SET_LOADING", true);
    const url = `/?method=flickr.tags.getRelated&api_key=${process.env.VUE_APP_API_KEY}&tag=${term}&format=json&nojsoncallback=1`;
    // make request
    instance
      .get(url)
      .then((response) => {
        console.log(response);
        commit("SET_RELATED", response.data.tags.tag);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
const modules = {};

export default createStore({
  state,
  mutations,
  actions,
  modules,
});
