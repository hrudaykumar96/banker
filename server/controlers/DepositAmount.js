const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const Transactions = require("../models/Transactions");
const DepositAmount = async (req, res) => {
    try {
        const { amount } = req.body;
        const token = await req.cookies;
        if (token) {
            const usertoken = jwt.decode(token.token, "SECETKEY")
            const data = await Users.findOne({ where: { email: usertoken.email } })
            await Users.update({ balance: parseFloat(data.balance) + parseFloat(amount) }, { where: { account_number: data.account_number } })
            const transactions = new Transactions({
                transaction_type: "deposit", transaction_amount: amount, account_id: data.account_number
            })
            await transactions.save();
            res.send("success")
        }
        else {
            console.log("unauthorised user")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = DepositAmount