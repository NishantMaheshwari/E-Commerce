const Product = require("../models/Product");

exports.getProduct = async (req, res) => {

    try {
        const {productId} = req.query;
        // console.log(productId);
        const product = await Product.findById(productId);
        if (product) {
          return res.status(200).json({success:true, product, meassage: 'Product fetched successfully'});
        } else {
          return res.status(400).json({ success:false, message: 'Product Not Found' });
        }
    } catch(error){
        console.error(error);
        return res.status(500).json({
			  success: false,
			  message: `Getting single product failed`,
		    });
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const query = {};
        if(req.query.category && req.query.category !== 'All'){
          query.category = req.query.category;
        }
        if(req.query.rating && req.query.rating !== 'All'){
          query.rating = req.query.rating;
        }
        const allProducts = await Product.find(query);
       // console.log(req.query.)
        if(req.query.sortQuery === 'lowToHigh') {
          allProducts.sort((a, b) => a.price - b.price);
        } else if (req.query.sortQuery === 'highToLow') {
          allProducts.sort((a, b) => b.price - a.price);
        }

        return res.status(200).json({
			  success: true,
			  allProducts
		});
    } catch(error){
        console.error(error);
		    return res.status(500).json({
			  success: false,
			  message: `Getting all products failed`,
		    });
    }
}

// exports.addProduct = async (req,res) => {
//   try{
//     const {name,category,price,rating,description,image} = req.body;
//     const newProduct = await Product.create({
//       name,
//       category,
//       price,
//       rating,
//       description,
//       image
//     });
//     console.log(newProduct.name);
//     return res.status(200).json({
//       success: true,
//       message: 'Product added'
//     });
//   }catch(error){
//     console.error(error);
// 		// Return 500 Internal Server Error status code with error message
// 		return res.status(500).json({
// 			success: false,
// 			message: `Adding product failed`,
// 		});
//   }
// }