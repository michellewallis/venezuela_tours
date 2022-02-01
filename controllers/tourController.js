const Tour = require('../models/tourModel');


//Get all tours
exports.getAllTours = async (req, res) => {
    try{
        // BUILD QUERY
        //1A filtering
        //page, sort, limit, fields

        // create a req.query copy
        const queryObj = {...req.query}
        const excludeFields = ['page', 'sort', 'limit','fields']
        excludeFields.forEach(field => delete queryObj [field]);


    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`); // Regular expresion

    let query = Tour.find(JSON.parse(queryStr));

    // 2) Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('price');
    }

    // 3) Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4) Pagination
    const page = req.query.page || 1;
    const limit = req.query.limit || 2;
    const skip = (page - 1) * limit;

    query = query.limit(limit).skip(skip);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist');
    }

    // EXECUTE QUERY
    const tours = await query;
    res.status(200).json({
      status: 'succes',
      results: tours.length,
      data: { tours: tours },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
// Get tour by id
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