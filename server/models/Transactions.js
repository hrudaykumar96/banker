const Sequelize = require("sequelize");
const sequelize = require("./Config");
const Transactions = sequelize.define("transactions", {
    account_id: {
        type: Sequelize.BIGINT,
    },
    date:{
        type:Sequelize.DATEONLY,
        defaultValue:new Date()
    },
    transaction_type: {
        type: Sequelize.STRING
    },
    transaction_amount: {
        type: Sequelize.FLOAT
    }
})

module.exports = Transactions