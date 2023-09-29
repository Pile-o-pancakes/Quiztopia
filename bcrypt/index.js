const bcrypt = require ('bcryptjs');
const saltRounds = 10;

async function hashPassword (password) {

    const hashedPassword = await bcrypt.hash (password, saltRounds);

    return hashedPassword;
};

async function verifyPassword (password, hashedPassword) {

    const correctPass = await bcrypt.compare(password, hashedPassword);
    return correctPass;
}

module.exports = { hashPassword, verifyPassword }