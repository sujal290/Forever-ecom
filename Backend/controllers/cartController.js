

// import userModel from "../models/userModel.js";


// // add products to user cart
// const addToCart = async (req, res) => {
//       try{
//      const { userId, itemId, size } = req.body;
//       const userData = await userModel.findById(userId);
//         let cartData = await userData.cartData;
//          if(cartData[itemId]){
//            if(cartData[itemId][size]){
//                  cartData[itemId][size] += 1;
//             }
//            else{
//                  cartData[itemId][size] = 1;
//             }
//         }
//        else{
//             cartData[itemId] = {};
//           cartData[itemId][size] = 1;
//          }
//        await userModel.findByIdAndUpdate(userId, {cartData})
//          res.json({success: true, message: "Product added to cart successfully"});
//      }
//      catch(error){
//         console.log(error)
//         res.json({success: false, message: error.message});
//     }
// }


// // update user cart
// const updateCart = async (req,res) => {
//     try {
//       const { userId ,itemId, size, quantity } = req.body
  
//       const userData = await userModel.findById(userId)
//       let cartData = await userData.cartData;
  
//       cartData[itemId][size] = quantity
  
//       await userModel.findByIdAndUpdate(userId, {cartData})
//       res.json({ success: true, message: "Cart Updated" })
  
//     } catch (error) {
//       console.log(error)
//       res.json({ success: false, message: error.message })
//     }
//   }
// // get user cart
// const getUserCart = async (req, res) => {
//     try{
//         const { userId } = req.body;
//         const userData = await userModel.findById(userId);
//         let cartData = await userData.cartData;
//         res.json({success: true, message: cartData});
//     }
//     catch(error){
//         console.log(error)
//         res.json({success: false, message: error.message})
//     }
// }

// export { addToCart, updateCart, getUserCart }



import userModel from "../models/userModel.js";

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Product added to cart successfully" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart Updated" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const cartData = userData.cartData || {};

    res.json({ success: true, cartData });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
