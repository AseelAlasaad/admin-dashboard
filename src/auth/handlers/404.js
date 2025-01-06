'use strict';

function handle404(req,res,next){

    const errorObj={
        status:404,
        message:'Sorry, we could not find what you were looking for'

    }
    res.status(404).json(errorObj)

}

module.exports = handle404;