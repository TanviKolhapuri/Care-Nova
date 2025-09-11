// Protect your sensitive data with Cipherion
// With the help of Cipherion's SDk

import cipherionClient from "Cipherion";

export const ProtectData = async (req, res) => {
    try {
        const { sensitiveData } = req.body;

        const encrypted = await cipherionClient.encrypt({
            data: sensitiveData,
        });



    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }

}