const ResponseHelper = {
    sendResponse(res,statusCode,data){
        if (statusCode == 200) {
            res.status(statusCode).json({
                messages: 'Success!',
                data
            })
        }
    }
}

module.exports = ResponseHelper