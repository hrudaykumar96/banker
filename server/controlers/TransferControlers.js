const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const Transactions = require("../models/Transactions");
const TransferControlers = async (req, res) => {
    try {
        const { account_number, amount } = req.body;
        const token = await req.cookies;
        if (token) {
            const usertoken = jwt.decode(token.token, "SECETKEY")
            const fromuser = await Users.findOne({ where: { email: usertoken.email } })
            const touser = await Users.findOne({ where: { account_number: account_number } })
            if (account_number !== fromuser.account_number) {
                if (touser) {
                    if (fromuser.balance >= amount) {
                        await Users.update({ balance: parseFloat(fromuser.balance) - parseFloat(amount) }, { where: { account_number: fromuser.account_number } })
                        await Users.update({ balance: parseFloat(touser.balance) + parseFloat(amount) }, { where: { account_number: account_number } })
                        const transactions = await Transactions.bulkCreate([{
                            transaction_type: `money transfer to ${account_number}`, transaction_amount: amount, account_id: fromuser.account_number
                        }, { transaction_type: `money received from ${fromuser.account_number}`, transaction_amount: amount, account_id: touser.account_number }]);
                        await transactions.save;
                        res.send("success")
                    }
                    else {
                        res.send("insufficient funds")
                    }
                }
                else {
                    res.send("invalid account number")
                }

            }
            else {
                res.send("cannot send to own account")
            }


        }
        else {
            console.log("unauthorised user")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = TransferControlers