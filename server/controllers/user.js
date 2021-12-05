import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });

        if(existingUser.length < 1) return res.status(404).json({ message: "User doesn't exist."});
        // console.log(typeof existingUser);

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials."});

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', {expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.'})
    }
};

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    const name = firstName +" "+ lastName

    const check = confirmPassword
          
    try {
        const existingUser = await User.find({ email: email });

        if (!existingUser.length < 1) return res.status(400).json( { message: "User already exists"});
        // console.log(typeof existingUser);

        if (password !== confirmPassword) return res.status(400).json({ message: 'Invalid password' });

        const hashedPasswword = await bcrypt.hash(password, 12);

        const result = await User.create({ email: email, password: hashedPasswword, name: `${firstName} ${lastName}` });
        
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', {expiresIn: "1h"});
  
        res.status(200).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.'})
    }
};