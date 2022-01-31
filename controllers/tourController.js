const Tour = require('../models/tourModel');


//ge all tours
exports.getAllTours = async (req, res) => {
    try{
        const tours = await Tour.find();
    res.status(200).json({
        status: 'succes',
        results: tours.length,
        data: { tours: tours},
    });
}catch (error){
    console.log(error);
    res.status(400).json({
        status : 'fail',
        message : 'error',
    })
}
};

// get one tour by id
exports.getTour = async (req,res)=> {
    try{
        const tour = await Tour.findById(req.params.id);
    res.status(200).json({
        status: 'succes',
        data: { tour},
    }); 
}catch (error) {
    console.log(error);
    res.status(400).json({
        status : 'fail',
        message : 'error',
    })
}
}

// create tour
exports.createTour = async (req,res)=> {
    try{
    const newTour = await Tour.create(req.body);
    res.status(201).json({
        status: 'succes',
        data: { tour:newTour},
    }); 
}catch (error){
    res.status(400).json({
        status : 'fail',
        message : 'error',
    })
}
}

// update tour by id
exports.updateTour = async (req,res)=> {
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
    res.status(200).json({
        status: 'succes',
        data: { tour},
    }); 
}catch (error) {
    res.status(400).json({
        status : 'fail',
        message : 'error',
    })
}
}

// delete tour
exports.deleteTour = async (req,res)=> {
    try{
         await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'succes',
        data: null,
    }); 
}catch (error){
    res.status(400).json({
        status : 'fail',
        message : 'error',
    })
}
}