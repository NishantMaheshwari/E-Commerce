const express = require('express');
const database = require("./config/database");
const dotenv = require("dotenv");
const authRouter = require("./routes/User");
const productRouter = require('./routes/Product');
const cartRouter = require('./routes/Cart');
const orderRouter = require('./routes/Order');
const cors = require('cors');

const app=express();

dotenv.config();

database.connect();    //connect() is a function that calls mongoose.connect()
const PORT = process.env.PORT || 4000;

// app.set('views','./views');
// app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(cors());

app.use("/api/auth",authRouter);
app.use("/api/products",productRouter);
app.use("/api/cart",cartRouter);
app.use("/api/orders",orderRouter);

// app.get('/', (req, res) => {
//     res.render('login'); // Renders the login.ejs template
// });

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})