const { sendResponse } = require ('./../../../responses/index');
const { db } = require ('./../../../services/db');

exports.handler = async (event, context) => {

    const { quizTitle } = event.pathParameters.title;

    try {

        const result = await db.scan ({
            TableName: 'question',
            Key: {
                titleOfQuiz: quizTitle
            }
        }).promise();

        if (result.Items.length = 0) {

            return sendResponse (200, { success: true, message: "Inga resultat hittades" });
        }
        else {

            return sendResponse (200, { success: true, message: result.Items });
        }
    }
    catch (error) {

        return sendResponse (error.statusCode, false, error.message)
    }
}