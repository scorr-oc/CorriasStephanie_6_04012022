const express = require('express');
const Sauce = require('../models/Sauce')
const fs = require('fs');
const { countReset } = require('console');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce)
  delete sauceObject._id
  const sauce = new Sauce ({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  sauce.save()
  .then(()=> res.status(201).json({message : 'sauce saved'}))
  .catch(error => res.status(400).json({ error }))
}

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
  .then(sauces => res.status(200).json(sauces))
  .catch(error => res.status(400).json({error}))
}

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(404).json({error}))
}

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {...req.body}
  Sauce.updateOne({_id: req.params.id},{...sauceObject, _id: req.params.id})
  .then(() => res.status(200).json({message : 'Object modified'}))
  .catch(error => res.status(400).json({error}))

}

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
  .then (sauce => {
    const filename = sauce.imageUrl.split('/images')[1]
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ _id : req.params.id})
        .then(() => res.status(200).json({message : 'Object deleted'}))
        .catch(error => res.status(400).json({error}))
    })
  })
  .catch(error => res.status(500).json({error})) 
}

exports.likeSauce = (req, res, next) => {

  console.log("je suis dans like")
  console.log("id en _id")
  console.log({_id: req.params.id})

  Sauce.findOne({_id: req.params.id})
  .then (sauce => {
    console.log(sauce)
    console.log(req.body)
   
    if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1){
      console.log('le user ne se trouve pas dans le tableau')
   
      Sauce.updateOne(
        { _id : req.params.id},
        { $inc: {likes: 1},
          $push: {usersLiked: req.body.userId}
        }
      )
      .then(() => res.status(201).json({message: 'like +1'}))
      .catch (error => res.status(400).json({error}))
    }

    if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0){
      Sauce.updateOne(
        { _id : req.params.id},
        { $inc: {likes: -1},
          $pull: {usersLiked: req.body.userId}
        }
      )
      .then(() => res.status(201).json({message: 'likes 0'}))
      .catch (error => res.status(400).json({error}))
    }

    if (!sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1){
      Sauce.updateOne(
        { _id : req.params.id},
        { $inc: {dislikes: 1},
          $push: {usersDisliked: req.body.userId}
        }
      )
      .then(() => res.status(201).json({message: 'dislikes +1'}))
      .catch (error => res.status(400).json({error}))
    }

    if (sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0){
      Sauce.updateOne(
        { _id : req.params.id},
        { $inc: {dislikes: -1},
          $pull: {usersDisliked: req.body.userId}
        }
      )
      .then(() => res.status(201).json({message: 'dislike 0'}))
      .catch (error => res.status(400).json({error}))
    }
  })
  .catch(error => res.status(404).json({error}))
}
