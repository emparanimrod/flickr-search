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
    state.isLoading = false;
  },

  SET_LOADING(state, loadingState) {
    state.isLoading = loadingState;
  },
};

const actions = {
  // get photos by search term
  getPhotos({ commit }, { term }) {
    const url = `/?method=flickr.photos.search&api_key=${process.env.VUE_APP_API_KEY}&text=${term}&format=json&nojsoncallback=1`;
    // set loading state
    commit("SET_LOADING", true);
    // make request
    instance.get(url).then((response) => {
      commit("SET_PHOTOS", response.photos.photo);
    });
  },

  // Get related tags based on search term

  getRelatedTags({ commit }, { term }) {
    // set loading state
    commit("SET_LOADING", true);
    const url = `${process.env.FLICKR_URL}&api_key=${process.env.FLICKR_URL}&text=${term}&format=json&nojsoncallback=1`;
    // make request
    axios
      .get(url)
      .then((response) => {
        commit("SET_PHOTOS", response.photos.photo);
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
