const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const multer = require('multer')
const upload = multer({
    dest: '../front-end/public/images/',
    limits: {
        fileSize: 10000000
    }
});

const mongoose = require('mongoose');

const charaSchema = new mongoose.Schema({
    name: String,
    age: Number,
    occupation: String,
    filePath: String,
    profile: String,
    personality: [{
        attribute: String,
        min: String,
        max: String,
        value: Number
    }],
});

const Character = mongoose.model("Character", charaSchema);

// connect to the database
mongoose.connect('mongodb://localhost:27017/characters', {
    useNewUrlParser: true
});

app.listen(3000, () => console.log('Server listening on port 3000!'));

app.post('/api/photos', upload.single('photo'), async (req, res) => {
    // Just a safety check
    if (!req.file) {
        return res.sendStatus(400);
    }
    res.send({
        path: "/images/" + req.file.filename
    });
});

app.get('/api/characters', async(req, res) => {
    try {
        let characters = await Character.find();
        res.send(characters);
    } catch (e) {
        //console.log(e);
        res.sendStatus(500);
    }
});

app.get('/api/characters/:id', async(req, res) => {
    try {
        let character = await Character.findOne({_id: req.params.id});
        res.send(character);
    } catch (e) {
        //console.log(e);
        res.sendStatus(500);
    }
});

app.post('/api/characters', async(req, res) => {
    const chara = new Character({
        name: req.body.name,
        age: req.body.age,
        occupation: req.body.occupation,
        filePath: req.body.filePath,
        profile: req.body.profile,
        personality: req.body.personality
    });
    try {
        await chara.save();
        res.send(chara);
    } catch (e) {
        //console.log(e);
        res.sendStatus(500);
    }
});

app.put('/api/characters/:id', async(req, res) => {
    try {
        let chara = await Character.findOne({_id: req.params.id});
        chara.name = req.body.name;
        chara.age = req.body.age;
        chara.occupation = req.body.occupation;
        chara.filePath = req.body.filePath;
        chara.profile = req.body.profile;
        chara.personality = req.body.personality;
        await chara.save();
        res.send(chara);
    } catch (e) {
        //console.log(e);
        res.sendStatus(500);
    }
});

app.delete('/api/characters/:id', async(req, res) => {
    try {
        await Character.deleteOne({_id: req.params.id});
        res.sendStatus(200);
    } catch (e) {
        //console.log(e);
        res.sendStatus(500);
    }
});