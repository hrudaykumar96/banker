const Sequelize = require("sequelize");


const sequelize = new Sequelize("banker", "root", "Welcome@2023", {
    logging:false,
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306
});

try {
    sequelize.authenticate();
    console.log("database connected successfully")
} catch (error) {
    console.log(error)
}



module.exports = sequelize;