var express = require('express');
const costume_controllers = require('../controllers/costume');
var router = express.Router();

const secured = (req, res, next) => {
    if (req.user){
        return next();
    }
    res.redirect("/login");
}


/* GET costumes page. */
router.get('/', costume_controllers.costume_view_all_Page);


router.get('/detail', costume_controllers.costume_view_one_Page);

router.get('/create', secured, costume_controllers.costume_create_Page);

router.get('/update', secured, costume_controllers.costume_update_Page);


router.get('/delete', secured, costume_controllers.costume_delete_Page);

router.get('/:id', costume_controllers.costume_detail);


module.exports = router;


