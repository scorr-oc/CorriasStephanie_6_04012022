/*
Importation d'express
*/
const express = require('express');
/*
Appel de la méthode express() par la création d'une constante
*/
const app = express();
/*
Importation de dotenv()
*/
const dotenv = require('dotenv')
const result = dotenv.config()
/*
Importation de Mongoose
*/
const mongoose = require('mongoose')
/* 
Ajout de l'adresse SRV récupérée sur MongoDB
*/
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.vwclf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true,
      useUnifiedTopology: true})
      .then(() => console.log('Connecté à MongoDB'))
      .catch(()=> console.log('Echec de la connexion à MongoDb'))

      /*
Importation des routers
*/
const userRoutes= require('./routes/user')
const sauceRoutes = require('./routes/sauce')

/*
Import de path pour acceder au path du serveur
*/
const path = require('path')

app.use(express.json())

/* 
Middleware pour que les serveurs puissent communiquer entre eux. In ne prend pas d'adresse pour pouvoir s'appliquer sur toutes les route
*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next()
})
/*
Gestion de la ressource /images par Express
*/
app.use('/images',express.static(path.join(__dirname,'images')))

/*
Enregistrement des routeurs
*/
app.use('/api/auth', userRoutes)
app.use('/api/sauces', sauceRoutes)

module.exports = app;