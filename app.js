const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer ();
const mongoose = require('mongoose');

const faker = require('@faker-js/faker').faker;
const config = require('./config')

console.log(config)

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${config.db.user}:${config.db.password}@lioncluster.i7ymodw.mongodb.net/?retryWrites=true&w=majority&appName=LionCluster`;

// Connexion à MongoDB avec Mongoose
mongoose.connect(uri)
 .then(() => console.log('Connexion à MongoDB réussie !'))
 .catch(err => console.error('Erreur de connexion à MongoDB', err));


const secret ='qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';

const jwts = require('jsonwebtoken');
var { expressjwt: jwt } = require("express-jwt");

const movieSchema = mongoose.Schema({
   movietitle: String,
   movieyear: Number
});

const Movie = mongoose.model('Movie', movieSchema);

const PORT = '3000';

app.use ('/public' , express.static('public'));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use((err, req, res, next) => {
   if (err.name === 'UnauthorizedError') { // Gérer les erreurs spécifiques à l'authentification JWT
     res.status(401).send('Invalid token...');
   } else {
     next(err);
   }
 });
 
 
let frenchmovies = [];

app.set('views','./view')
app.set('view engine', 'ejs');

app.use( jwt({ secret: secret, algorithms: ["HS256"] }).unless ({path:['/','/movies', '/movies/add','/search', '/login', new RegExp('/movies.*/', 'i')]}));


app.get('/search', (req, res) => {
res.render('movies-search')

})

app.use((req, res, next) => {
    console.log(req.headers);
    next();
});


 app.get('/movies', (req, res) => {
const title = 'Fil français des 30 dernières Années .'; 

   frenchmovies = [
      {title: `Le fabuleux destin d\'Amélie Poulain`, year: 2000},
      {title: 'Buffet Froid', year : 1998},
      {title: 'Le diner de cons ', year : 2001},
      {title: 'Avatar', year: 2002},
   ]
   res.render('movies', { movies: frenchmovies, title : title });
})
var urlencodedParser = bodyParser.urlencoded({extended: false});


app.post('/movies', (req, res) => {
   const { movietitle, movieyear } = req.body;

   if (!movietitle || !movieyear) {
       return res.status(400).json({ error: 'Le titre et l\'année sont requis.' });
   }

   const year = parseInt(movieyear, 10);
   if (isNaN(year)) {
       return res.status(400).json({ error: 'L\'année doit être un nombre valide.' });
   }

   const myMovie = new Movie({ movietitle, movieyear: year });
   myMovie.save()
       .then(savedMovie => {
           res.status(201).json(savedMovie);
       })
       .catch(err => {
           console.error(err);
           res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement du film' });
       });
});



 app.get('/movies/add', (req, res) => {
    res.send('Prochainement, un formulaire d\'ajout ici') ;
})

 app.get('/movies/:id/', (req, res) => {
    const id = req.params.id;
        res.render('movies-details', { movietitle: movietitle, movieyear: movieyear});

 });

 app.put('/movies/:id', (req, res) => {
   if(!req.boy) {
      return res.sendStatus(500);
   } console.log ('movietitle: ', req.body.movietitle, 'movieyear: ', req.body.moviesyear); 
   const id =req.params.id;
   Movie.findByIdAndUpdate(id, {$set: {movietitle : req.body.movietitle, movieyear : req.body.movieyear}}, {new: true}, (err, movie) => {
       if (err) {
         console.log(err); 
         return res.send('Le Film n\'a pas pu être mise a jour ');
       }
   });

});
 app.get('/' , (req, res) => {
   //res.send('hello world!')
   res.render('index');

});

app.get('/login', (req, res) => {
res.render('login', {title : 'Espace Membre'}); 

});

const fakeUser = { email : 'to', password : 'aaa'};

app.post('/login', urlencodedParser, (req,res) =>{
   console.log('login post', req.body);
   if(!req.body){
     
      res.status(500);
   } else {
      if (fakeUser.email === req.body.email && fakeUser.password === req.body.password)
   {
         const myToken = jwts.sign({iss: 'http//expressmovies.fr', user: 'sam', role:'moderator'}, secret);
         console.log('myToken', myToken);
         
         res.json({
            token: myToken,
            email: 'toto@toto.fr',
            favoriteMovie : 'Terminator',
            favoriteMovieTheater : '6 avenue lingostières, 06200 Nice',
            lastLinDate : new Date ()
   });
} else {
   res.sendStatus(401)
}
app.get('/member-only' , (req, res) =>{
   console.log('req.user', req.user);
   res.send(req.user);

})
   
}

})

  app.listen(PORT, () =>{

    console.log(`listening on port ${PORT}`);
 });

 