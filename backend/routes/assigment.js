const router = require('express').Router();
let assigment_Schema = require('../models/assigment');

router.route('/addassigment').post((req, res) => {
    const { code, topic, des, date, picture } = req.body;
    const assigment = new assigment_Schema({ code, topic, des, date, picture });
    assigment.save()
        .then(() => res.json('assigment Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/updateassigment/").put(async (req, res) => {
    const { code, topic, des, date, picture } = req.body;
    console.log(code, topic, des, date, picture);
    const assigment = {
        code, topic, des, date, picture
    }
    const update = await assigment_Schema.findOneAndUpdate({ code: code }, assigment).then(() => {
        res.status(200).send({ status: "assigment Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.route("/deleteassigment/:code").delete(async (req, res) => {
    let code = req.params.code;
    assigment_Schema.findOneAndDelete({ code: code })
        .then(() => {
            res.status(200).send({ status: "assigment Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

router.route("/allassigment").get(async (req, res) => {
    assigment_Schema.find()
        .then(assigment => res.json(assigment))
        .catch(err => res.status(400).json('No Data'))
});

router.route("/allassigment/:searchNo").get(async (req, res) => {
    assigment_Schema.find({ code: req.params.searchNo })
        .then(assigment => res.json(assigment))
        .catch(err => res.status(400).json('No Data'))
});


module.exports = router;