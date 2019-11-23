var express = require('express');
var router = express.Router();
var rodController = require('../controllers/RodController');

// Obteniendo varas

router.get('/:name', rodController.getOne);

router.get('/', rodController.getAll);

// Creación de varas

router.post('/', rodController.create);

// Modificación de varas

router.put('/:name', rodController.update);

// Eliminación de vara

router.delete('/:name', rodController.delete);

module.exports = router;

