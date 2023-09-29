const middy = require ('@middy/core');
const { checkQuizBody } = require ('./../../../middleware/checkBody');
const { validateJWT } = require ('./../../../middleware/auth');
const { sendResponse } = require ('./../../../responses/index');
const { db } = require ('./../../../services/db');

const handler = middy()
    .handler(async (event, context) => {

        if ('error' in event) {

            return sendResponse (event.error, { success: false, message: event.errorMessage });
        }

        const { quizTitle } = event.body;
    
        try {
    
            const quizDeleted = await db.delete ({
                TableName: 'quiz',
                Key: {
                    title: quizTitle
                }
            }).promise ();
    
            if (quizDeleted === false) {
    
                return sendResponse (400, { success: true, message: "Inget quiz med denna titeln hittades" });
            }
            else {
    
                db.BatchWriteItem ({
                    RequestItems: {
                        "question": [{
                            DeleteRequest: {
                                Key: {
                                    "titleOfQuiz": {
                                        "S": quizTitle
                                    }
                                }
                            }
                        }]
                    }
                })//Syntax?????
    
                return sendResponse (200, { success: true, message: "Quiz och tillhörande frågor borttagna" });
            }
        }
        catch (error) {
    
            return sendResponse (500, { success: false, message: error.message });
        }
    })
    .use(validateJWT)
    .use(checkQuizBody);

module.exports = { handler }