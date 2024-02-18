const Sequelize = require("sequelize");
const sequelize = require("./Config");
const Users = sequelize.define("Users", {
    account_number: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    mobile: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true
    },
    balance: {
        type: Sequelize.FLOAT(18,2),
        allowNull: false,
        defaultValue: 0
    },
    dob: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
    {
        initialAutoIncrement: 1000000000,
    }
)

module.exports = Users