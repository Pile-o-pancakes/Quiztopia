module.exports = function sendResponse (statusCode, success, message) {
    
    return {
        statusCode: statusCode,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            success: success,
            message: message
          }
        )
    };
}