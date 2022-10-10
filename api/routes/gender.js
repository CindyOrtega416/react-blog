const router = require('express').Router();
const Gender = require('../models/Gender')

router.post('/', async (req, res) => {
    const newGender = new Gender(req.body);
    try {
        const savedGender = await newGender.save()
        res.status(200).json(savedGender)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/", async (req, res) => {
    try {
        const genders = await Gender.find();
        res.status(200).json(genders)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;