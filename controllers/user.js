/*
Importation de bcrypt
*/
const bcrypt = require('bcrypt')
/*
Importation de jsonwebtoken
*/
const jwt = require('jsonwebtoken')

const User = require('../models/User')

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User ({
                email: req.body.email,
                password: hash
            })
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé'}))
            .catch( error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))

}

exports.login = (req, res, next) => {
    User.findOne( {email: req.body.email})
        .then(user => {
            if(!user) {
                return res.status(401).json({error:'Utilisateur non trouvé'})
            }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid){
                    return res.status(401).json({error: 'Mot de passe incorrect'})
                }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id},
                    '86ab11fe835957fbceb19b92c7c22f5898a7eea3572814e2aa3b712f8f026778083d7011d219f7bdbe621638388fb991fa9a1d8c173ac7a596b122c21c38903c',
                    { expiresIn: '24h'}
                ) 
            })
            })
            .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}