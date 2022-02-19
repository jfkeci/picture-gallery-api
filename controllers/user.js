import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(404).json({ message: 'User with email doesnt exist' })
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({
            email: existingUser.email,
            id: existingUser._id
        }, process.env.SECRET, { expiresIn: '1h' })

        return res.status(200).json({
            user: existingUser,
            token: token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Something went wrong' })
    }
}

export const registerUser = async (req, res) => {
    const { email, password, confirmPassword, name, surname } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: 'User with this email already exists' })
        if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' })
        if (password.length < 6) return res.status(400).json({ message: 'Password too short' })

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await User.create({
            email: email,
            password: hashedPassword,
            name: name + ' ' + surname,
        })

        const token = jwt.sign({
            email: newUser.email,
            id: newUser._id
        }, process.env.SECRET, { expiresIn: '1h' })

        return res.status(200).json({
            user: newUser,
            token: token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Something went wrong' })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});

        return res.status(200).json(users)
    } catch (error) {
        return res.status(404).json({ error: error })
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.find({ _id: id });

        if (!user) return res.status(404).json({ message: 'No user found' })

        return res.status(200).json(user)
    } catch (error) {
        return res.status(404).json({ error: error })
    }
}

export const getUserName = async (req, res) => {
    let { id } = req.params
    try {
        const user = await User.findOne({ _id: id })

        return res.status(200).json({ name: user.name })
    } catch (error) {
        return res.status(404).json({ error: error })
    }
}