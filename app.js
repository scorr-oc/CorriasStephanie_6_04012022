/*
Importation d'express
*/
const express = require('express');
/*
Appel de la méthode express() par la création d'une constante
*/
const app = express();
/*
Importation de Mongoose
*/
const mongoose = require('mongoose')

/* 
Ajout de l'adresse SRV récupérée sur MongoDB
*/
mongoose.connect('mongodb+srv://michelle:steco91@cluster0.kbdyl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true,
      useUnifiedTopology: true})
      .then(() => console.log('Connecté à MongoDB'))
      .catch(()=> console.log('Echec de la connexion à MongoDb'))
      
app.use(express.json())

/* 
Middleware pour que les serveurs puissent communiquer entre eux. In ne prend pas d'adresse pour pouvoir s'appliquer sur toutes les route
*/
app.use((req, res, next) => {
    // Permet d'accéder à notre API depuis n'importe quelle origine "*"
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Permet d'ajouter les headers mentionnés aux requêtes envoyées à l'API(Origin...)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Permet d'envoyer des requêtes avec les méthodes mentionnées (get, post....)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next()
})


module.exports = app;