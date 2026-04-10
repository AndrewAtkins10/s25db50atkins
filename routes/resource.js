var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api');
var costume_controller = require('../controllers/costume');

router.get('/', api_controller.api);

router.post('/costumes', costume_controller.costume_create_post);
router.delete('/costumes/:id', costume_controller.costume_delete);
router.put('/costumes/:id', costume_controller.costume_update_put);
router.get('/costumes/:id', costume_controller.costume_detail);
router.get('/costumes', costume_controller.costume_list);
router.put('/costumes/:id', costume_controller.costume_update_put);

module.exports = router;