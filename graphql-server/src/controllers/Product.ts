const Product = require("../models/Product");

export const getProduct = async (req:any, res:any) => {

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

export const getAllProducts = async (req:any, res:any) => {
    try {
        const query:any = {};
        if(req.query.category && req.query.category !== 'All'){
          query.category = req.query.category;
        }
        if(req.query.rating && req.query.rating !== 'All'){
          query.rating = req.query.rating;
        }
        const allProducts = await Product.find(query);
       // console.log(req.query.)
        if(req.query.sortQuery === 'lowToHigh') {
          allProducts.sort((a:any, b:any) => a.price - b.price);
        } else if (req.query.sortQuery === 'highToLow') {
          allProducts.sort((a:any, b:any) => b.price - a.price);
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

export const getAllProductIds = async (req:any,res:any) => {
  try{
    // console.log(98);
    const ids = await Product.find({}, '_id');
    const productIds = ids.map((product:any) => product._id.toString());
    // console.log(productIds);
    return res.status(200).json({
      success: true,
      productIds
  });
  }catch(error){
    console.error('Error fetching product IDs:', error);
    return res.status(500).json({
      success: false,
      message: `Getting all product ids failed`,
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