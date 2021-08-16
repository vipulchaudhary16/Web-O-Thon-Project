const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
var cons = require('consolidate');
mongoose.connect('mongodb://localhost:27017/agricultureHut', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;

//for take questions data in mongodb
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    purposeOfWebsite: String
  });

const contact = mongoose.model('contact', contactSchema);

app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded());


app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('index', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contactUs', params);
})

app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("We recieved Your question , will reply soon")
    }).catch(()=>{
        res.status(400).send("Error 404 ! Please try again")
    });
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});