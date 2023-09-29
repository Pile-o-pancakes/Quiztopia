const jwt = require ('jsonwebtoken');
const { verifyPassword } = require ('./../../../bcrypt/index');
const { sendResponse } = require ('./../../../responses/index');
const { db } = require ('./../../../services/db');

exports.handler = async (event, context) => {

    const { userName, password } = JSON.parse (event.body);

    try {

        const data = await db.get ({
            TableName: 'user',
            Key : {
                userName: userName
            }
        }).promise();

        const verifiedPassword = await verifyPassword(password, data.Item.password);

        if (verifiedPassword === true) {

            const token = jwt.sign({ id: data.Item.userID }, 'Pannkaka', {

                expiresIn: '1h'
            });
            return sendResponse (200, { success: true, message: "Inloggad", userID: data.Item.userID, token: token });
        }
        else {

            return sendResponse (400, { success: true, message: "Fel användarnamn eller lösenord" });
        }
    }
    catch (error) {

        return sendResponse (400, { success: false, message: error.message })
    }
}