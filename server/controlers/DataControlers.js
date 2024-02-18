const Users = require("../models/Users");
const Transactions = require("../models/Transactions");
const jwt = require("jsonwebtoken");
const DataControlers = async (req, res) => {
    const token = await req.cookies;
    try {
        if (token) {
            const usertoken = jwt.decode(token.token, "SECETKEY")
            const data = await Users.findOne({ where: { email: usertoken.email }, include: Transactions, order: [[Transactions, 'createdAt', 'DESC']] })
            res.send(data)
        }
        else {
            console.log("unauthorised user")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = DataControlers