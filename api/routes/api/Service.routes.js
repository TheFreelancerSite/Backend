const router = require('express').Router();
const ServiceController = require('../../controllers/services')


router.get('/service' , ServiceController.getAllServices)