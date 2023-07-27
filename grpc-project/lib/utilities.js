const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const saltRounds = 10; // The number of salt rounds determines the computational cost (higher is more secure but slower)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}
async function verifyPassword(plainPassword, hashedPassword) {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
}
module.exports = {
    hashPassword,
    verifyPassword
}