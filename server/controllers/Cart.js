const User = require('../models/User');

exports.getCart = async (req,res) => {
    try{
        const {userId} = req.user;
        const user = await User.findById(userId).populate('cart');
        // console.log(user);
        if (user) {
            return res.status(200).json({success:true, cart:user.cart, meassage: 'Cart fetched successfully'}); //do I need to return products or products ids???
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

exports.addToCart = async(req,res) => {
    try{
        const {productId} = req.body;
        const {userId} = req.user;
        if(!userId || !productId){
          return res.status(400).json({
              success:failure,
              message:"Incomplete information sent for adding product to cart"
          });
        }
        const user = await User.findById(userId);
        if (user.cart.includes(productId)) {
          return res.status(400).json({ success: false, message: 'Product already exists in the cart' });
        }
        const newUser = await User.findOneAndUpdate(
          {_id:userId},
          {$push:{cart:productId}},
          {new:true}
        );
        // console.log(newUser.cart);
        if(!newUser){
          return res.status(400).json({ success:false, message: 'User Not Found' });
        }
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

exports.removeFromCart = async(req,res) => {
    try{
      const {productId} = req.body;
      const {userId} = req.user;
      const user = await User.findById(userId);
      if (!user.cart.includes(productId)) {
        return res.status(400).json({ success: false, message: 'Product does not exist in the cart' });
      }
      const newUser = await User.findOneAndUpdate(
        {_id:userId},
        {$pull:{cart:productId}},
        {new:true}
      );
      // console.log(newUser);
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

exports.emptyCart = async (req,res) => {
  try{
    const {userId} = req.user;
    const user = await User.findById(userId);
    if(!userId){
      return res.status(400).json({
          success:failure,
          message:"Incomplete information sent for emptying cart"
      });
    }
    const newUser = await User.findOneAndUpdate(
      {_id:userId},
      {$set:{cart:[]}},
      {new:true}
    );
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