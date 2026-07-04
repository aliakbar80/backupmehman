const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');

require("dotenv").config();

// routes
const AdminRoutes = require('./routers/auth/Admin')
const GuestRouter = require('./routers/Guest/GuestRouter')
const RoomPriceRouter = require('./routers/RoomPrice/RoomPriceRouter')
const isLogin = require('./routers/islogin')

const app = express();

const port = process.env.PORT
const db = process.env.DB
const version = "/v1"

// Middleware
app.use(express.static('public'));
app.use(cors({ origin: '*' }));

app.use(express.json());

app.use(version + "/auth", AdminRoutes);
app.use(version + "/auth", isLogin);
app.use(version + "/guest" , GuestRouter)
app.use(version + "/roomprice", RoomPriceRouter)

app.use((req, res, next) => {
    res.status(404).send('<h1 style="text-align:center; color:#fff ;background:red">404 - Not Found</h1>');
    next();
});

app.listen(port, () => {
    console.log(`server run port ${port} ...`);
})

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};


mongoose.connect(db, options);

mongoose.connection.on('open', () => {
    console.log('Datebase connected...');
})
