
//ge all tours
exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'succes',
        data: { tours: 'GET ALL TOURS'},
    });
};

// get one tour
exports.getTour = (req,res)=> {
    res.status(200).json({
        status: 'succes',
        data: { tours: 'GET ONE TOUR BY ID'},
    }); 
}

// create tour
exports.createTour = (req,res)=> {
    res.status(201).json({
        status: 'succes',
        data: { tours: 'ADD TOUR'},
    }); 
}

// update tour
exports.updateTour = (req,res)=> {
    res.status(200).json({
        status: 'succes',
        data: { tours: 'TOUR UPDATE'},
    }); 
}

// delete tour
exports.deleteTour = (req,res)=> {
    res.status(204).json({
        status: 'succes',
        data: null,
    }); 
}