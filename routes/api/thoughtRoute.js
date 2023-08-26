const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReact,
  removeReact,
} = require('../../controllers/thoughtController');

// /api/applications
router.route('/').get(getThought).post(createThought);

// /api/applications/:applicationId
router
  .route('/:applicationId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/applications/:applicationId/tags
router.route('/:applicationId/tags').post(addReact);

// /api/applications/:applicationId/tags/:tagId
router.route('/:applicationId/tags/:tagId').delete(removeReact);

module.exports = router;
