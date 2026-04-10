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
exports.costume_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await Costume.findById(req.params.id) 
        res.send(result) 
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
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

exports.costume_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Costume.findById(req.params.id)
        // Do updates of properties
        if(req.body.costume_type) toUpdate.costume_type = req.body.costume_type;
        if(req.body.cost) toUpdate.cost = req.body.cost;
        if(req.body.size) toUpdate.size = req.body.size;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
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