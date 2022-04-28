const express = require('express');
const router = express.Router();

const paletasController = require('../controller/paletasController');

//
// find todas paletas
router.get('/all-paletas', paletasController.findAll);
//
// find by id
router.get('/one-paleta/:id', paletasController.find);
//
// create
router.post('/create-paleta', paletasController.create);
//
// put
router.put('/update-paleta/:id', paletasController.update);
//
// delete
router.delete('/delete-paleta/:id', paletasController.delete);

module.exports = router;
