const { sendResponse } = require ('./../../../responses/index');
const { db } = require ('./../../../services/db');

exports.handler = async (event, context) => {

    try {

        const allQuizzes = await db.scan ({
            TableName: 'quiz'
        }).promise();

        return sendResponse (200, { success: true, message: allQuizzes.Items });
    }
    catch (error) {

        return sendResponse (500, { success: false, message: error.message });
    }
}