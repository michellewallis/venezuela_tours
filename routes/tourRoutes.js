const router = require('express').Router();
const tourController = require('../controllers/tourController')
const aliasMiddleware = require('../middlewares/aliasTopTours')
// Routes
router.route('/top-2-cheap')
.get(aliasMiddleware.aliasTopTours, tourController.getAllTours)

router.route('/').get(tourController.getAllTours).post(tourController.createTour);

router.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = router;