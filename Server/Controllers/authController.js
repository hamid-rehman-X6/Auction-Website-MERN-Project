const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/Users");
const nodemailer = require("nodemailer");
const Products = require("../Models/Products");
const SellerForm = require("../Models/Seller");
const BidderForm = require("../Models/Bidder");

// token generate
const generateToken = (id) => {
    return jwt.sign({ id }, "secret5575key5755", {
        expiresIn: "1d",
    });
};

// ----------------------------------------  SIGNUP API   ------------------------------------------------
exports.signup = async (req, res) => {
    try {
        const existingUser = await UserModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Hash password bcrypt
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await UserModel.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role,
        });

        const token = generateToken(newUser._id);
        res.status(201).json({
            msg: `User-${newUser.role} Registered Successfully`,
            userId: newUser._id,
            role: newUser.role,
            token,
            isSellerRegistered: newUser.isSellerRegistered,
            isBidderRegistered: newUser.isBidderRegistered,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

// ----------------------------------------  LOGIN API   ------------------------------------------------
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ msg: "User not Exist" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password valid: ", isPasswordValid);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Incorrect Password! Try Again" });
        }

        const token = generateToken(user._id);
        res.status(200).json({
            msg: "Login Successfully",
            userId: user._id,
            role: user.role,
            token,
            isSellerRegistered: user.isSellerRegistered,
            isBidderRegistered: user.isBidderRegistered,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: "InternalServerError" });
    }
};

// ----------------------------------  GETALLUSERS API   ------------------------------------------

exports.getAllUsers = async (req, res) => {
    try {
        const getAllUser = await UserModel.find();
        return res.status(201).json({ message: "ALl User Data", Data: getAllUser });
    } catch (error) {
        console.error(error);
    }
};

// ----------------------------------  DELETEUSERS API  ------------------------------------------

exports.deleteUsers = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log('Deleting user with ID:', userId);

        const user = await UserModel.findById(userId);


        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Delete user
        await UserModel.findByIdAndDelete(userId);

        // If the user is a seller, delete their products and seller form
        if (user.role === 'Seller') {
            await Products.deleteMany({ userId: userId });
            await SellerForm.deleteOne({ user: userId });
        }
        if (user.role === 'Bidder') {
            await Products.deleteMany({ userId: userId });
            await BidderForm.deleteOne({ user: userId });
        }

        console.log("User and their related data deleted successfully");


        res.status(200).send({ message: 'User and their related data deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).send({ message: 'Error deleting user', error: err });
    }
}



// -----------------------------------  FORGOT-PASSWORD API   --------------------------------------

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.send({ Status: "User not Existed" })
            }
            const token = jwt.sign({ id: user._id }, "secret5575key5755 ", { expiresIn: "1d" })
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'm.hamidrehman1221@gmail.com',
                    pass: 'matm lpqd ctnu uxzl'
                }
            });

            var mailOptions = {
                from: 'm.hamidrehman1221@gmail.com',
                to: 'hamidrehman1012@gmail.com',
                subject: 'Reset Your Password',
                text: `http://localhost:5173/reset-password/${user._id}/${token}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    return res.send({ Status: Succes });
                }
            });

        })

}

// --------------------------------  RESET-PASSWORD API   ---------------------------------


exports.resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    jwt.verify(token, "secret5575key5755", (err, decoded) => {
        if (err) {
            return res.json({ Status: "Invalid Token" })
        } else {
            bcrypt.hash(password, 10)
                .then(hash => {
                    UserModel.findByIdAndUpdate({ _id: id }, { password: hash })
                        .then(u => res.send({ Status: Success }))
                        .catch(err => res.send({ Status: err }))
                })
                .catch(err => res.send({ Status: err }))
        }

    })
}