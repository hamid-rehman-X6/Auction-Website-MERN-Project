const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/Users");
const nodemailer = require("nodemailer");

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

        // Assign JWT (json web token) to user

        const token = jwt.sign({ userId: newUser._id }, "secret5575key5755", {
            expiresIn: "1d",
        });
        // Return different response messages based on the user's role
        if (newUser.role === "Seller") {
            return res
                .status(201)
                .json({ msg: "User-Seller Registered Successfully", token });
        } else {
            return res
                .status(201)
                .json({ msg: "User-Bidder Registered Successfully", token });
        }

        // return res.status(201).json({ msg: "User Registered Successfully", token });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            // console.log("No such user found!");
            return res.status(404).json({ msg: "User not Exist" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            //   console.log("Incorrect password");
            return res.status(401).json({ msg: "Incorrect Password! Try Again" });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, "secret5575key5755", {
            expiresIn: "1d",
        });
        return res.status(201).json({ msg: "Login Successfully", userId: user._id, token, role: user.role });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: "InternalServerError" });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const getAllUser = await UserModel.find();
        return res.status(201).json({ message: "ALl User Data", Data: getAllUser });
    } catch (error) {
        console.error(error);
    }
};


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