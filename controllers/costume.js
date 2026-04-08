var Costume = require('../models/costume');

exports.costume_list = async function(req, res) {
    try {
        const theCostumes = await Costume.find();
        res.send(theCostumes);
    }
    catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }  
};

exports.costume_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Costume detail: ' + req.params.id);
};

exports.costume_create_post = async function(req, res) {
    console.log("Body received:", req.body); 
    let document = new Costume();
    document.costume_type = req.body.costume_type;
    document.cost = req.body.cost;
    document.size = req.body.size;
    try {
        let result = await document.save();
        res.send(result);
    } catch(err) {
        console.log("DB Error:", err); 
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

exports.costume_delete = async function(req, res) {
    try {
        let result = await Costume.findByIdAndRemove(req.params.id);
        res.send(result);
    }
    catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

exports.costume_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: Costume update PUT' + req.params.id);
};


exports.costume_view_all_Page = async function(req, res) {
    try {
        theCostumes = await Costume.find();
        res.render('costumes', { title: 'Costume Search Results', results: theCostumes });
    }
    catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }  
};