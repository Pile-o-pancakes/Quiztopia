import { nanoid } from 'nanoid';

const { sendResponse } = require ('./../../../responses/index');
const { db } = require ('./../../../services/db');

exports.handler = async (event, context) => {

    const { title, userID } = JSON.parse(event.body);

    try {

        const usedTitle = await db.scan ({
            TableName: 'quizzes',
            Key: {
                title: title
            }
        }).promise();

        const quizID = nanoid();

        if (usedTitle.Count > 0) {

            return sendResponse (400, { success: true, message: "Ett quiz med denna titeln finns redan" });
        }
        else {

            await db.put ({
                TableName: 'quizzes',
                Item: {
                    id: quizID,
                    creatorID: userID,
                    title: title
                }
            }).promise();
        }

        return sendResponse (200, { success: true, message: "Nytt quiz sparat" });
    }
    catch (error) {

        return sendResponse (500, {success: false, message: error.message })
    }
}