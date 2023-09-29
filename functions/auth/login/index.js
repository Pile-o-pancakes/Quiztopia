const jwt = require ('jsonwebtoken');
const middy = require ('@middy/core');
const { checkLoginBody } = require ('./../../../middleware/checkBody');
const { verifyPassword } = require ('./../../../bcrypt/index');
const { sendResponse } = require ('./../../../responses/index');
const { db } = require ('./../../../services/db');

const handler = middy()
    .handler(async (event, context) => {

        if ('error' in event) {

            return sendResponse (event.error, { success: false, message: event.errorMessage });
        }
    
        const {userName, password } = event.body;

        try {
    
            const data = await db.get ({
                TableName: 'user',
                Key: {
                    userName: userName
                }
            }).promise();
    
            if (data.Item === undefined) {
    
                return sendResponse (200, { success: true, message: "Användaren finns inte" });
            }
    
            const verifiedPassword = await verifyPassword(password, data.Item.password);
    
            if (verifiedPassword === true) {
    
                const token = jwt.sign({ id: data.Item.userID }, 'Pannkaka', {
    
                    expiresIn: '1h'
                });
    
                return sendResponse (200, { success: true, message: "Inloggad", userName: userName, userID: data.Item.userID, token: token });
            }
            else {
    
                return sendResponse (400, { success: true, message: "Fel användarnamn eller lösenord" });
            }
        }
        catch (error) {
    
            return sendResponse (400, { success: false, message: error.message })
        }
    })
    .use(checkLoginBody);

module.exports = { handler }