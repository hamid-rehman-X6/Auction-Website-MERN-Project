
const Admin = require("../Models/Admin");

// Define the admin credentials
const adminEmail = "adminBidBuy0069@gmail.com";
const adminPassword = "Qwerty1234!@#";

// let isAdminLoggedIn = true;

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    // Check if an admin is already logged in
    // if (!isAdminLoggedIn) {
    //     return res.status(401).json({ message: "Admin is already logged in" });
    // }

    // Check if the provided email and password match the admin credentials
    if (email === adminEmail && password === adminPassword) {
        try {
            const adminData = await Admin.create(req.body);
            isAdminLoggedIn = true;
            return res.status(201).json({ message: "ADMIN Logged-in Successfully", Data: adminData });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
