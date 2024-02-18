const express = require("express");
const app = express();
const userRoutes = require("./routers/userRoutes");
const cookieparser = require("cookie-parser");
const Users = require("./models/Users");
const Transactions = require("./models/Transactions");
const sequelize = require("./models/Config");
const cors = require("cors");
app.use(cookieparser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET, POST, PUT, DELETE"],
    credentials: true
}))
app.use("/users", userRoutes)
try {
    app.listen(5000, () => {
        console.log("server started")
    })
} catch (error) {
    console.log(error)
}

Users.hasMany(Transactions, { foreignKey: 'account_id' })
Transactions.belongsTo(Users, { foreignKey: 'account_id' })


sequelize.sync()
    .then(console.log("all models created successfully"))
    .catch((error) => console.log(error))