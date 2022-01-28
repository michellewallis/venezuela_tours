const router = require('express').Router();
const tourController = require('../controllers/tourController')

// Routes
router.route('/').get(tourController.getAllTours).post(tourController.createTour);
router.route('/:id').get(tourController.getTour).patch(tourController.updateTour);

module.exports = router;