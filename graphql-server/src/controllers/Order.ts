const Order = require('../models/Order');

export const addOrder = async(req:any,res:any) => {
    try{
        const {productIds,totalPrice} = req.body;
        const {userId} = req.user;
        if(!userId || !productIds || !totalPrice){
            return res.status(400).json({
                success:false,
                message:"Incomplete information send for adding order"
            });
        }

        const savedOrder = await Order.create({
            user:userId,
            orderItems:productIds,
            totalPrice
        });
        // const newUser = await User.findOneAndUpdate(
        //     {_id:userId},
        //     {$push : {orders:savedOrder}},
        //     {new:true}
        // );
        // if(!newUser){
        //     return res.status(400).json({ success:false, message: 'User Not Found' });
        // }
        return res.status(200).json({ success:true, message: 'Order Placed successfully.'})
    }catch(error){
        console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Order cannot be added`,
		});
    }
}

export const getOrders = async(req:any,res:any) => {
    try{
        const {userId} = req.user;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"Incomplete information send for fetching order"
            });
        }
        // const user = await User.findById(userId);
        // if(!user){
        //     return res.status(400).json({ success:false, message: 'User Not Found' });
        // }
        const userOrders = await Order.find({ user: userId }).populate('orderItems');
        const userOrderProducts = userOrders.map((order:any) => {
            return {
                id:order._id,
                products : order.orderItems,
                totalPrice : order.totalPrice 
            }
        });
        return res.status(200).json({
            success:true,
            orders:userOrderProducts,
            messgage:"Order sent"
        });
    }catch(error){
        console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Order cannot be fetched`,
		});
    }
}