const jwt = require ('jsonwebtoken');

const validateJWT = {
    before: async (req) => {

        try {

            const token = req.event.headers.authorization.replace('Bearer ', '');

            if (!token) {

                throw new Error();
            }
            else {

                const data = jwt.verify ('token', 'Pannkaka');
                request.event.id = data.id;
                request.event.userName = data.userName;

                return req.response;
            }
        }
        catch (error) {

            req.event.error = '401';

            return req.response;
        }
    },
    onError: async (req) => {

        req.event.error = '401';

        return req.response;
    }
}

module.exports = { validateJWT }