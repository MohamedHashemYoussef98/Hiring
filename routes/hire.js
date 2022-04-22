const express = require('express')
const router = express.Router()
const hireControllers = require('../controllers/hire')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const filename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
      Object.assign(req.body , {cv :filename })
      cb(null,filename )
    }
  })
  
const upload = multer({ storage: storage })

router.post('/add' ,upload.single('cv'), hireControllers.Add )
router.get('/' , hireControllers.GetAll)
module.exports = router