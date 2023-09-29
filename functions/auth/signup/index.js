import { nanoid } from 'nanoid';

const { sendResponse } = require ('./../../../responses/index');
const { hashPassword } = require ('./../../../bcrypt/index');
const { db } = require ('./../../../services/db');

exports.handler = async (event, context) => {

    const { userName, password } = JSON.parse(event.body);
    const userID = nanoid();

    try {

        console.log('hashing...')
        const hashedPassword = await hashPassword (password);
        console.log('hashed')

        if (hashedPassword === null || hashedPassword === undefined) {

            return sendResponse (400, { success: false, message: "Error" });
        }
        else {

            console.log('nanoid är nu ' + userID + 'lösen är ' + password + ' och hash är ' + hashedPassword)
            await db.put ({

                TableName: 'user',
                Item: {
                    userName: userName,
                    password: hashedPassword,
                    userID: userID
                }
            }).promise ();

            console.log('sparat i DB')
            return sendResponse (200, { success: true, message: "Nytt konto skapat" });
        }
    }
    catch (error) {

        return sendResponse (400, { success: false, message: "Catch error" });
    }
}