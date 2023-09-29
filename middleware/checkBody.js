
const checkLoginBody = {
    before: async (req) => {

        try {

            if ('userName' in req.event.body == false ||
                'password' in req.event.body == false) {

                    req.event.error = '401';
                    req.event.error.message = 'Användarnamn och lösenord krävs';
                    return req.response;
                }
        }
        catch {

            req.event.error = '500';
            req.event.error.message = 'Error';
            return req.response;
        }
    },
    onError: async (req) => {

        req.event.error = '401';

        return req.response;
    }
}

const checkQuizBody = {
    before: async (req) => {

        try {

            if ('title' in req.event.body == false) {

                    req.event.error = '401';
                    req.event.error.message = 'En titel krävs';
                    return req.response;
                }
        }
        catch {

            req.event.error = '500';
            return req.response;
        }
    },
    onError: async (req) => {

        req.event.error = '401';

        return req.response;
    }
}

const checkQuestionBody = {
    before: async (req) => {

        try {

            if ('quizTitle' in req.event.body == false ||
                'question' in req.event.body == false ||
                'answer' in req.event.body == false ||
                'longitude' in req.event.body == false ||
                'latitude' in req.event.body == false) {

                    req.event.error = '401';
                    req.event.error.message = 'Data saknas';
                    return req.response;
                }
        }
        catch {

            req.event.error = '500';
            return req.response;
        }
    },
    onError: async (req) => {

        req.event.error = '401';

        return req.response;
    }
}

module.exports = { checkLoginBody, checkQuizBody, checkQuestionBody };