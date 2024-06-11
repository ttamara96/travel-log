const { Router } = require('express');
const LogEntry = require('../models/LogEntry');


const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const entries = await LogEntry.find();
        res.json(entries);
    } catch (error) {
        next(error);
    }

});

router.post('/', async (req, res, next) => {
    try {
        const logEntry = new LogEntry(req.body);
        console.log(req.body);
        const createdEntry =  await logEntry.save();
        res.json(createdEntry);
    } catch (error) {
        console.log(error.name);
        if(error.name == "ValidationError") {
            res.status(422);
        }
        next(error);
    }
});


router.put('/:id', async (req, res, next) => {
    try { 
        console.log(req.body);
        delete req.body.createdAt;
        delete req.body.updatedAt;
        delete req.body.__v;
        const updatedResult = 
            await LogEntry.findByIdAndUpdate( 
                { _id: req.params.id }, 
                { 
                    ...req.body
                },
                {new: true}         //To return the updated entry
            ); 
        res.json(updatedResult);
    } catch (error) { 
        console.log(error); 
        if(error.name == "ValidationError") {
            res.status(422);
        }
        next(error);
    } 
});

module.exports = router;