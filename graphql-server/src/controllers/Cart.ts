const Cart = require('../models/Cart');

export const getCart = async (req:any,res:any) => {
    try{
        const {userId} = req.user;
        const cartDocs = await Cart.find({user : userId}).populate('cartItem');
  
        const cartItems = cartDocs.map((cartDoc:any) => {
          return {
            product: cartDoc.cartItem,
            id: cartDoc._id
          }
        });
        if (userId) {
            return res.status(200).json({success:true, cart:cartItems, meassage: 'Cart fetched successfully'}); //do I need to return products or products ids???
        } else {
            return res.status(400).json({ success:false, message: 'User Not Found' });
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
			  success: false,
			  message: `Getting the cart failed`,
		    });
    }
}

export const addToCart = async(req:any,res:any) => {
    try{
        const {productId} = req.body;
        const {userId} = req.user;
        if(!userId || !productId){
          return res.status(400).json({
              success:false,
              message:"Incomplete information sent for adding product to cart"
          });
        }

        const userCart = await Cart.find({user : userId});
        const userCartProducts = userCart.map((cart:any) => cart.cartItem.toString());
        // console.log(userCartProducts);
        if (userCartProducts.includes(productId)) {
          return res.status(400).json({ success: false, message: 'Product already exists in the cart' });
        }

        const cartDoc = await Cart.create({
          user : userId,
          cartItem : productId
        })

        return res.status(200).json({
          success:true,
          message: 'Product added to cart'
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
			  success: false,
			  message: `Adding product to cart failed`,
		    });
    }
}

export const removeFromCart = async(req:any,res:any) => {
    try{
      const {productId : cartItem} = req.body;
      const {userId : user} = req.user;

      const result = await Cart.deleteOne({ user, cartItem });

      if(result.deletedCount === 0) {
        return res.status(400).json({ success: false, message: 'Product does not exist in the cart' });
      }


      return res.status(200).json({
        success:true,
        message: 'Product removed from cart'
      });
    }catch(error){
      console.log(error);
      return res.status(500).json({
      success: false,
      message: `Removing product from cart failed`,
      });
   }
}

export const emptyCart = async (req:any,res:any) => {
  try{
    const {userId} = req.user;

    const result = await Cart.deleteMany({ 
      user : userId
     });

    return res.status(200).json({
      success:true,
      message: 'Products removed from cart'
    });
  }catch(error){
    console.log(error);
      return res.status(500).json({
      success: false,
      message: `Removing products from cart failed`,
      });
  }
}