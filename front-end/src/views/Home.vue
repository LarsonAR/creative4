<template>
  <div class="container home">
    <h1 class="page-title">Browse Character Profiles</h1>

    <div class="row justify-content-between mb-2">
      <div class="col-auto">
        <h4>Profiles found: {{ this.shownProfiles.length }}</h4>
      </div>
      <div class="col-auto">
        <input v-model="search" placeholder="search profiles">
      </div>
    </div>

    <div class="row person" v-for="profile in this.shownProfiles" :key="profile._id">
      <div class="col-auto pfp"><img :src="profile.filePath"/></div>
      <div class="col-md-3 col-10 name">
        <h2>{{ profile.name }}</h2>
      </div>
      <div class="col occupation">
        <h6>{{ profile.occupation }}</h6>
      </div>
      <div class="col-2 text-center view">
        <router-link :to="'/profile/' + profile._id"><strong>View Profile</strong></router-link>
      </div>
      <div class="col-2 text-center view">
        <router-link :to="'/edit/' + profile._id"><strong>Edit Profile</strong></router-link>
      </div>
      <div class="col-1 text-center delete">
        <a href="#" id="delete" title="Delete Profile" @click="deleteProfile(profile)">X</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      search: "",
      profiles: [],
    }
  },
  created() {
    this.getProfiles()
  },
  computed: {
    shownProfiles() {
      return this.profiles.filter(v =>
          v.name.toLowerCase().search(this.search.toLowerCase()) >= 0 ||
          v.occupation.toLowerCase().search(this.search.toLowerCase()) >= 0 ||
          v.profile.toLowerCase().search(this.search.toLowerCase()) >= 0);
    }
  },
  methods: {
    async getProfiles() {
      try {
        let response = await axios.get("/api/characters");
        this.profiles = response.data;
        return true;
      } catch (e) {
        console.log(e);
      }
    },
    async deleteProfile(profile) {
      let id = profile._id;
      try {
        await axios.delete('/api/characters/' + id);
      } catch (e) {
        console.log(e);
      }

      await this.getProfiles();
    }
  }
}
</script>

<style scoped>

  .person {
    background-color: #e9ecef;
    border-radius: 5px;
    margin-bottom: 1em;
    align-items: center;
  }
  .pfp {
    padding: 2px;
  }
  .pfp img {
    width: 50px;
    max-height: 50px;
    border-radius: 100%;
  }
  .name {
    background-color: #497575;
    border-radius: 5px;
    padding: 5px;
    color: white;
  }
  .name h2 {
    margin: 0;
  }
  .occupation h6 {
    margin: 0;
  }
  .view a {
    color: black;
  }
  .delete a {
    color: red;
  }
</style>