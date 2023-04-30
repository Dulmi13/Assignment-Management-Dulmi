const router = require('express').Router();
let marksheet_Schema = require('../models/marksheet');

router.route('/addmarksheet').post((req, res) => {
    const { code, topic, picture } = req.body;
    const marksheet = new marksheet_Schema({ code, topic, picture });
    marksheet.save()
        .then(() => res.json('marksheet Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route("/allmarksheet").get(async (req, res) => {
    marksheet_Schema.find()
        .then(marksheet => res.json(marksheet))
        .catch(err => res.status(400).json('No Data'))
});

module.exports = router;