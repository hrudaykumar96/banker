const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const Transactions = require("../models/Transactions");
const WithdrawAmount = async (req, res) => {
    try {
        const { amount } = req.body;
        const token = await req.cookies;
        if (token) {
            const usertoken = jwt.decode(token.token, "SECETKEY")
            const data = await Users.findOne({ where: { email: usertoken.email } })
            if (data.balance >= amount) {
                await Users.update({ balance: parseFloat(data.balance) - parseFloat(amount) }, { where: { account_number: data.account_number } })
                const transactions = new Transactions({
                    transaction_type: "withdraw", transaction_amount: amount, account_id: data.account_number
                })
                await transactions.save();
                res.send("success")
            }
            else {
                res.send("insufficient funds")
            }
        }
        else {
            console.log("unauthorised user")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = WithdrawAmount