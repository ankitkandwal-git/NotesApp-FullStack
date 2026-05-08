const bcrypt = require('bcrypt');
const db = require('../db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'notesapp-dev-secret';

const signToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        JWT_SECRET,
        { expiresIn: '7d' }
    );
};

const registerUser = async (req, res) => {
    const username = req.body.username ?? req.body.name;
    const { email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword],
            function (err) {
                if (err) {
                    if (String(err.message || '').includes('UNIQUE constraint failed')) {
                        return res.status(409).json({ message: 'Email already registered' });
                    }
                    console.error('Error registering user:', err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }

                const user = { id: this.lastID, username, email };
                const token = signToken(user);
                return res.status(201).json({ message: 'User Registered Successfully', token, user });
            }
        );
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const loginUser = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, userRow) => {
        if (err) {
            console.error('Login error:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!userRow) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const ok = await bcrypt.compare(password, userRow.password);
        if (!ok) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = { id: userRow.id, username: userRow.username, email: userRow.email };
        const token = signToken(user);
        return res.json({ message: 'Login successful', token, user });
    });
};

module.exports = { registerUser, loginUser };