const router = require('express').Router();
const AnimalType = require('../models/AnimalType')

router.post('/', async(req, res) => {
    const newAnimalType = new AnimalType(req.body);
    try {
        const savedAnimalType = await newAnimalType.save()
        res.status(200).json(savedAnimalType)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/", async(req, res)=> {
    try{
        const animalTypes = await AnimalType.find();
        res.status(200).json(animalTypes)
    }catch (err){
        res.status(500).json(err)
    }
})

module.exports = router;