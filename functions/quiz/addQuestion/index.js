const middy = require ('@middy/core');
const { checkQuestionBody } = require ('./../../../middleware/checkBody');
const { validateJWT } = require ('./../../../middleware/auth');
const { sendResponse } = require ('./../../../responses/index');
const { db } = require ('./../../../services/db');

const handler = middy()
    .handler (async (event, context) => {

        if ('error' in event) {

            return sendResponse (event.error, { success: false, message: event.errorMessage });
        }

        const { quizTitle, question, answer, longitude, latitude } = event.body;
    
        try {
    
            const validQuiz = await db.scan ({
                TableName: 'quiz',
                Key: {
                    title: quizTitle,
                    creatorName: creatorName
                }
            }).promise();
    
            if (validQuiz.Items.length = 0) {
    
                return sendResponse (400, { success: false, message: "Inga quiz av denna användaren hittades" });
            }
            else {
    
                db.put ({
                    TableName: 'question',
                    Item: {
                        titleOfQuiz: quizTitle,
                        question: question,
                        answer: answer,
                        longitude: longitude,
                        latitude: latitude
                    }
                }).promise();
        
                return sendResponse (200, { success: true, message: "Ny fråga sparad" });
            }
        }
        catch (error) {
    
            return sendResponse (500, { success: false, message: error.message });
        }
    })
    .use(validateJWT)
    .use(checkQuestionBody);

module.exports = { handler }