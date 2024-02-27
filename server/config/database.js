const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL,
        {dbName:'eCommerce'})
    .then(() => console.log("DB Connected Successfully"))
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
};




/*
1) Should I save user id in orders model?
2) should I fetch product ids and then fetch products with another route or directly fetch the products by using populate in the controller?
3) Should the filtering and searching logic be in frontend or in the backend???
4) In cart page, after deleting should I fetch the complete list back from the backend or just update the list in the frontend??
5) $push adds id or the whole document.
6) How to improve the routing and make Navbar common. read the web dev article on routing.
*/ 