// import { nanoid } from 'nanoid';

const sendResponse = require ('./../../../responses/index');
// const createNewUser = require ('./../../../bcrypt/index');

exports.handler = async (event, context) => {

    const { userName, password } = event.body;
    const userID = nanoid();

    try {

        // const result = await createNewUser (userName, password, userID);

        if (result === true) {

            return sendResponse (200, true, "Nytt konto skapat");
        }
        else {

            return sendResponse (500, false, "Error");
        }
    }
    catch (error) {

        return sendResponse (error.statusCode, false, error.message)
    }
}