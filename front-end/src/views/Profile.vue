<template>
  <div id="profile" class="container">
    <h1 id="title" class="text-center">{{ this.profile.name }}'s Profile</h1>
    <div class="row justify-content-around">
      <div id="left" class="col-md-4">
        <div id="top" class="no-gutters text-center">
          <h1>{{ this.profile.name }}</h1>
          <h5><strong>AGE:</strong> {{ this.profile.age }} years</h5>
          <h5><strong>ROLE:</strong> {{ this.profile.occupation }}</h5>
        </div>
      </div>
      <div id="right" class="col-md-6 row">
        <div class="col-sm-6" v-for="personality in this.profile.personality" :key="personality.attribute">
          <Attribute :attribute="personality"></Attribute>
        </div>
      </div>
    </div>
    <div id="bio" class="row">
      <p>{{ this.profile.profile }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Attribute from "@/components/Attribute";

export default {
  name: "Profile",
  data() {
    return {
      profile: {}
    }
  },
  components: {
    Attribute,
  },
  created() {
    this.getProfile();
  },
  methods: {
    async getProfile() {
      let id = this.$route.params.id;
      try {
        let response = await axios.get('/api/characters/' + id);
        this.profile = response.data;
      } catch (e) {
        console.log(e);
      }
    },
  },
}
</script>

<style scoped>
  #title {
    font-size: 3em;
    margin-bottom: 1em;
  }
  #top {
    color: white;
  }
  #top h1 {
    margin-bottom: 0.7em;
  }
  p {
    margin-bottom: 3px;
  }
  #left {
    padding: 5px;
    background-color: #497575;
    border-radius: 10px;
  }
  .col-sm-6 {
    margin-bottom: 12px !important;
  }
  #bio {
    margin-top: 2em;
    padding: 8px;
    border-radius: 5px;
    background-color: #e9ecef;
  }
</style>