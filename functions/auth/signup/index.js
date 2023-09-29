const { nanoid} = require ('nanoid');

const middy = require ('@middy/core');
const { checkLoginBody } = require ('./../../../middleware/checkBody');
const { sendResponse } = require ('./../../../responses/index');
const { hashPassword } = require ('./../../../bcrypt/index');
const { db } = require ('./../../../services/db');

const handler = middy()
    .handler(async (event, context) => {

        if ('error' in event) {

            return sendResponse (event.error, { success: false, message: event.errorMessage });
        }

        const { userName, password } = event.body;
        const userID = nanoid();
    
        try {
    
            const isNameTaken = await db.scan ({
                TableName: 'user',
                Key: {
                    userName: "name"
                }
            }).promise();
    
            if (isNameTaken.Items.length > 0) {
    
                return sendResponse (400, { success: false, message: "Användarnamnet är upptaget" });
            }
    
            const hashedPassword = await hashPassword (password);
    
            await db.put ({
    
                TableName: 'user',
                Item: {
                    userName: userName,
                    password: hashedPassword,
                    userID: userID
                }
            }).promise ();
    
            return sendResponse (200, { success: true, message: "Nytt konto skapat" });
        }
        catch (error) {
    
            return sendResponse (400, { success: false, message: error.message });
        }
    })
    .use(checkLoginBody);

module.exports = { handler }