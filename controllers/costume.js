var Costume = require('../models/costume');

exports.costume_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Costume list');
};

exports.costume_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Costume detail: ' + req.params.id);
};

exports.costume_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Costume create POST');
};

exports.costume_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Costume delete DELETE ' + req.params.id);
};

exports.costume_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: Costume update PUT' + req.params.id);
};