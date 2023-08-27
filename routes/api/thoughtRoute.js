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
  .route('/:thoughtsId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/applications/:applicationId/tags
router.route('/:thoughtsId/reactions').post(addReact);

// /api/applications/:applicationId/tags/:tagId
router.route('/:thoughtsId/reactions/:reactionId').delete(removeReact);

module.exports = router;
