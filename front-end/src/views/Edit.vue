<template>
  <div class="container edit">
    <div v-if="edited">
      <p class="added">Character profile edited successfully <router-link :to="'/profile/' + id">(View Character)</router-link></p>
    </div>
    <div v-else>
      <h1 class="page-title">Edit {{profile.name}}'s Profile</h1>
      <form class="">
        <label for="name" class="big-label">Name</label>
        <input v-model="profile.name" placeholder="name" id="name">

        <div class="row no-gutters justify-content-around">
          <div class="col-auto">
            <label for="age">Age:</label>
            <input v-model="profile.age" type="number" id="age" min="0">
          </div>

          <div class="col-auto">
            <label for="occupation">Role:</label>
            <input v-model="profile.occupation" id="occupation">
          </div>

          <div class="col-auto">
            <label>Avatar: </label>
            <input type="file" name="photo" @change="fileChanged">
          </div>
        </div>

        <label for="profile" class="big-label">In-Depth Profile</label>
        <textarea v-model="profile.profile" id="profile" placeholder="Biography, personality information, etc."></textarea>

        <div class="attribute" v-for="attribute in this.profile.personality" :key="attribute.attribute">
          <div class="row no-gutters justify-content-center">
            <label for="attName">New Attribute: </label>
            <input v-model="attribute.name" id="attName" placeholder="attribute name">
          </div>
          <div class="row no-gutters justify-content-around">
            <input class="extreme" v-model="attribute.min" id="attMin" placeholder="minimum extreme">
            <input v-model="attribute.value" type="range" id="attRange">
            <input class="extreme" v-model="attribute.max" id="attMax" placeholder="maximum extreme">
            <button type="button" id="delete" @click="deleteAttribute(attribute)">X</button>
          </div>
        </div>
        <button id="addAtt" type="button" @click="addAttribute()">Add Personality Attribute</button>
        <button id="addChar" type="button" @click="editCharacter()">Finish Editing</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Edit",
  data() {
    return {
      profile: {},
      file: null,
      id: "",
      edited: false
    }
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
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    addAttribute() {
      let attribute = {
        name: "",
        min: "",
        max: "",
        value: 50
      }
      this.profile.personality.push(attribute);
    },
    deleteAttribute(attribute) {
      let index = this.profile.personality.findIndex(v => v === attribute);
      this.profile.personality.splice(index, 1);
    },
    async editCharacter() {
      if (this.file) await this.upload();
      let character = this.profile;
      let id = this.$route.params.id;
      try {
        let response = await axios.put('/api/characters/' + id, character);
        this.edited = true;
        this.id = response.data._id;
      } catch (e) {
        console.log(e);
      }
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name);
        let response = await axios.post('/api/photos', formData);
        this.profile.filePath = response.data.path;
      } catch (e) {
        console.log(e);
      }
    }
  }

}
</script>

<style scoped>
.added {
  width: 30em;
  margin: 0 auto;
  text-align: center;
  background-color: #cdffcd;
  border-radius: 5px;
}
form {
  background-color: aliceblue;
  padding: 6px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 5px 5px #bbbbc1 inset;
}
label {
  margin-right: 5px;
}
.big-label {
  display: block;
  text-align: center;
  font-size: 2em;
  margin: 0;
}
#name {
  display: block;
  font-size: 1.2em;
  margin: 5px auto 10px auto;
  width: 35%;
  min-width: 250px;
}
#profile {
  display: block;
  width: 95%;
  margin: 0 auto;
}
.attribute {
  margin: 10px 0;
}
.extreme {
  width: 20%;
}
#attRange {
  width: 40%;
}
#delete {
  color: red;
}
#addAtt {
  display: block;
  margin: 5px auto;
}
#addChar {
  display: block;
  margin: 15px auto;
  font-size: 1.5em;
}
</style>