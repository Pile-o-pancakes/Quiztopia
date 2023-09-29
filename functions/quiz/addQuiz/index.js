const middy = require ('@middy/core');
const { checkQuizBody } = require ('./../../../middleware/checkBody');
const { auth } = require ('./../../../middleware/auth');
const { sendResponse } = require ('./../../../responses/index');
const { db } = require ('./../../../services/db');

const handler = middy()
    .handler (async (event, context) => {

        if ('error' in event) {

            return sendResponse (event.error, { success: false, message: event.error.message });
        }

        const { title, userName } = JSON.parse(event.body);
    
        try {
    
            const isTitleTaken = await db.scan ({
                TableName: 'quiz',
                FilterExpression: "title = :t",
                ExpressionAttributeValues: {
                    ":t": {
                        S: title
                    }
                }
            }).promise();
    
            if (isTitleTaken.Items.length > 0) {
    
                return sendResponse (400, { success: true, message: "Ett quiz med denna titeln finns redan" });
            }
            else {
    
                await db.put ({
                    TableName: 'quiz',
                    Item: {
                        title: title,
                        creatorName: userName
                    }
                }).promise();
    
                return sendResponse (200, { success: true, message: "Nytt quiz sparat" });
            }
        }
        catch (error) {
    
            return sendResponse (500, {success: false, message: error.message })
        }
    }).use(auth)
    .use(checkQuizBody);