const express = require('express')
const router = express.Router()
const auth = require('../middleware/authorize')
const multer = require('../middleware/multer-config')

const routeCtrl = require('../controllers/sauce')

router.get('/',auth, routeCtrl.getAllSauces)
router.post('/',auth , multer, routeCtrl.createSauce)
router.get('/:id', auth, routeCtrl.getOneSauce)
router.put('/:id', auth, multer, routeCtrl.modifySauce)
router.delete('/:id', auth, routeCtrl.deleteSauce)
router.post('/:id/like',auth, routeCtrl.likeSauce)



module.exports = router