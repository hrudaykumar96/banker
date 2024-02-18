const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const usercontrolers = async (req, res) => {
    try {
        const { name, email, mobile, dob, gender, address, password } = req.body
        const hashpassword = await bcrypt.hash(password, 10)
        const user = new Users({
            name, email, mobile, dob, gender, address, password: hashpassword
        })
        const emailavailable = await Users.findOne({ where: { email: email } })
        const numberavailable = await Users.findOne({ where: { mobile: mobile } })
        if (emailavailable) {
            res.send("email already registered")
        }
        else if (numberavailable) {
            res.send("mobile number already registered")
        }
        else {
            await user.save();
            res.send("success")
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = usercontrolers