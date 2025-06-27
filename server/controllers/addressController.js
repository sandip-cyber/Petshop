//ADD Address : /api/address/add

import Address from "../models/Address.js"

export const addAddress = async (req, res) => {
    try {
        const userId = req.userId; // from auth middleware
        const addressData = req.body; // address fields from frontend
        await Address.create({ ...addressData, userId });
        res.json({ success: true, message: "Address added Successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Get Address : /api/address/get

export const getAddress = async(req,res)=>{
    try {
        const userId = req.userId
        const addresses = await Address.find({userId});
        res.json({success: true, address: addresses});
    } catch (error) {
         console.log(error.message);
        res.json({success: false, message: error.message});
    }
}