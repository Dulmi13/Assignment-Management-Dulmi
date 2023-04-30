const router = require('express').Router();
let submit_Schema = require('../models/submit');

router.route('/addsubmit').post((req, res) => {
    const { assCode, code, date, remainings, picture } = req.body;
    const submit = new submit_Schema({ assCode, code, date, remainings, picture });
    submit.save()
        .then(() => res.json('marksheet Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route("/allsubmit").get(async (req, res) => {
    submit_Schema.find()
        .then(submit => res.json(submit))
        .catch(err => res.status(400).json('No Data'))
});

module.exports = router;