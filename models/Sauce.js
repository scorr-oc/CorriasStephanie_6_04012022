const mongoose = require('mongoose')

const sauceSchema = mongoose.Schema ({
  name : {type: String, require: true},
  manufacturer : {type: String, require: true},
  description : {type: String, require: true},
  imageUrl :{type: String, require: true},
  userId : {type: String, require: true},
  mainPepperIngredient : {type: String, require: true}, 
})

module.exports = mongoose.model('Sauce', sauceSchema)