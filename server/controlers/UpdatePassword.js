const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const UpdatePassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkemail = await Users.findOne({ where: { email: email } })
        if (checkemail) {
            const hashpassword = await bcrypt.hash(password, 10)
            Users.update({ password: hashpassword }, { where: { email: email } })
            res.send("password changed")
        }
        else {
            res.send("email not registered")
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = UpdatePassword