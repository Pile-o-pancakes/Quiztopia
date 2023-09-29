
const checkLoginBody = {
    before: async (req) => {

        req.event.body = JSON.parse(req.event.body);

        try {

            if (!req.event.body.hasOwnProperty ('userName') ||
                !req.event.body.hasOwnProperty ('password')) {

                    req.event.error = '401';
                    req.event.errorMessage = 'Användarnamn och lösenord krävs';
                    return req.response;
                }
            else {

                return req.response;
            }
        }
        catch {

            req.event.error = '500';
            req.event.errorMessage = 'Catch Error';
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

        req.event.body = JSON.parse(req.event.body);

        try {

            if ('title' in req.event.body == false) {

                    req.event.error = '401';
                    req.event.errorMessage = 'En titel krävs';
                    return req.response;
                }
            else {

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

        req.event.body = JSON.parse(req.event.body);

        try {

            if ('quizTitle' in req.event.body == false ||
                'question' in req.event.body == false ||
                'answer' in req.event.body == false ||
                'longitude' in req.event.body == false ||
                'latitude' in req.event.body == false) {

                    req.event.error = '401';
                    req.event.errorMessage = 'Data saknas';
                    return req.response;
            }
            else {

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