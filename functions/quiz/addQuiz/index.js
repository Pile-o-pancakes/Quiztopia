const sendResponse = require ('./../../../responses/index');

exports.handler = async (event, context) => {

    try {

        
        return sendResponse (200, true, "Nytt quiz sparat");
    }
    catch (error) {

        return sendResponse (error.statusCode, false, error.message)
    }
}