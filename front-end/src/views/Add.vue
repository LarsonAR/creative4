<template>
  <div class="container add">
    <h1 class="page-title">Add a New Character Profile</h1>
    <div v-if="added">
      <p class="added">Character profile added successfully.</p>
    </div>
    <div v-else>
      <form class="">
        <label for="name" class="big-label">Name</label>
        <input v-model="character.name" placeholder="name" id="name">

        <div class="row no-gutters justify-content-around">
          <div class="col-auto">
            <label for="age">Age:</label>
            <input v-model="character.age" type="number" id="age" min="0">
          </div>

          <div class="col-auto">
            <label for="occupation">Role:</label>
            <input v-model="character.occupation" id="occupation">
          </div>

          <div class="col-auto">
            <label>Avatar: </label>
            <input type="file" name="photo" @change="fileChanged">
          </div>
        </div>

        <label for="profile" class="big-label">In-Depth Profile</label>
        <textarea v-model="character.profile" id="profile" placeholder="Biography, personality information, etc."></textarea>

        <div class="attribute" v-for="attribute in this.character.personality" :key="attribute.attribute">
          <div class="row no-gutters justify-content-center">
            <label for="attName">New Attribute: </label>
            <input v-model="character.attribute.name" id="attName" placeholder="attribute name">
          </div>
          <div class="row no-gutters justify-content-around">
            <input class="extreme" v-model="character.attribute.min" id="attMin" placeholder="minimum extreme">
            <input v-model="character.attribute.value" type="range" id="attRange">
            <input class="extreme" v-model="character.attribute.max" id="attMax" placeholder="maximum extreme">
            <button type="button" id="delete" @click="deleteAttribute(attribute)">X</button>
          </div>
        </div>
        <button id="addAtt" type="button" @click="addAttribute()">Add Personality Attribute</button>
        <button id="addChar" type="button" @click="addCharacter()">Add Character</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Add",
  data() {
    return {
      added: false,
      character: {
        name: "",
        age: 0,
        occupation: "",
        profile: "",
        personality: [],
        filePath: null,
      },
      file: null,
    }
  },
  methods: {
    fileChanged(event) {
      this.character.file = event.target.files[0];
    },
    addAttribute() {
      let attribute = {
        attribute: "",
        min: "",
        max: "",
        value: 50
      }
      this.character.personality.push(attribute);
    },
    deleteAttribute(attribute) {
      let index = this.character.personality.findIndex(v => v === attribute);
      this.character.personality.splice(index, 1);
    },
    async addCharacter() {
      if (this.file) await this.upload();
      let character = this.character;
      try {
        await axios.post('/api/characters', character);
        this.added = true;
      } catch (e) {
        console.log(e);
      }
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name);
        let response = await axios.post('/api/photos', formData);
        this.character.filePath = response.data.path;
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<style scoped>
  form {
    background-color: aliceblue;
    padding: 6px;
    border-radius: 10px;
    margin-bottom: 10px;
    box-shadow: 0 5px 5px #bbbbc1 inset;
  }
  .added {
    width: 20em;
    margin: 0 auto;
    text-align: center;
    background-color: #cdffcd;
    border-radius: 5px;
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