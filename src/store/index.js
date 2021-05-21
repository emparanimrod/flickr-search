import { createStore } from "vuex";
import axios from "axios";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");

// setup relative time
dayjs.extend(relativeTime);

// cancel token
let CancelToken = axios.CancelToken;
let source = CancelToken.source();

// axios instance
const instance = axios.create({
  baseURL: "https://www.flickr.com/services/rest",
  timeout: 10 * 1000,
});

const state = {
  photos: [],
  related: [],
  isLoading: false,
  photoDate: "",
  searchTerm: "",
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

  SET_DATE(state, date) {
    state.photoDate = date;
  },

  CLEAR_DATE(state) {
    state.photoDate = "";
  },
  SET_SEARCHTERM(state, term) {
    state.searchTerm = term;
  },
};

const actions = {
  // get photos by search term
  getPhotos({ commit }, term) {
    commit("SET_LOADING", true);
    const url = `/?method=flickr.photos.search&api_key=${process.env.VUE_APP_API_KEY}&text=${term}&format=json&nojsoncallback=1`;
    // set loading state
    source = axios.CancelToken.source();
    // make request
    instance.get(url, { cancelToken: source.token }).then((response) => {
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
      .get(url, { cancelToken: source.token })
      .then((response) => {
        commit("SET_RELATED", response.data.tags.tag);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getPhotoUploadTime({ commit }, id) {
    const url = `/?method=flickr.photos.getInfo&api_key=${process.env.VUE_APP_API_KEY}&photo_id=${id}&format=json&nojsoncallback=1`;
    instance
      .get(url)
      .then((response) => {
        commit(
          "SET_DATE",
          dayjs.unix(response.data.photo.dateuploaded).fromNow()
        );
      })
      .catch((error) => console.log(error));
  },
  clearPhotoUploadTime({ commit }) {
    console.log("clearing");
    commit("CLEAR_DATE");
  },

  // cancel request

  cancelRequest({ commit }) {
    source.cancel("cancelled by user");
    commit("SET_LOADING", false);
  },

  // set search term
  setSearchTerm({ commit }, term) {
    commit("SET_SEARCHTERM", term);
  },
};
const modules = {};

export default createStore({
  state,
  mutations,
  actions,
  modules,
});
