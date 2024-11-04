import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        message:
          "Please provide all required fields (name, email, and password).",
        success: false,
      });
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email is already in use. Please try a different email.",
        success: false,
      });
    }

    // Hash the password before saving
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user in the database
    await UserModel.create({
      name,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      message: "Account created successfully!",
      success: true,
    });
  } catch (error) {
    console.error("Error in user registration:", error);
    return res.status(500).json({
      message: "Internal server error. Please try again later.",
      success: false,
    });
  }
};




// const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if both email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                message: 'Missing email or password. Please check and try again.',
                success: false
            });
        }

        // Find the user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User does not exist.',
                success: false
            });
        }

        // Compare the entered password with the stored hash
        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            return res.status(401).json({
                message: 'Incorrect password. Please check and try again.',
                success: false
            });
        }

        const SECRET_KEY = 'afafklja54afakkea134a54fafdkafk';

        // Generate a JWT token
        const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, { expiresIn: '1h' });

        // Create a user object to return
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token
        };

        // Send the response
        return res.status(200).json({
            message: 'User logged in successfully.',
            success: true,
            user: userData
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            message: 'Internal server error. Please try again later.',
            success: false
        });
    }
};
