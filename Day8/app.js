const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const app = express();

const PORT = 3000;
const JWT_SECRET = 'your-secret-key-here';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// In-memory storage (replace with database in production)
const users = [];

// JWT Middleware to verify token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to MyApp!' });
});

// Create Account
app.post('/api/create-account', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        
        if (!fullName || !email || !password) {
            return res.status(400).json({ error: 'All fields required' });
        }
        
        if (users.find(u => u.email === email)) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { id: Date.now().toString(), fullName, email, password: hashedPassword };
        users.push(user);
        
        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
        
        res.json({ message: 'Account created', token, user: { id: user.id, fullName, email } });
        
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = users.find(u => u.email === email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
        
        res.json({ message: 'Login successful', token, user: { id: user.id, fullName: user.fullName, email } });
        
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Example of Protected Route 
app.get('/api/profile', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user: { id: user.id, fullName: user.fullName, email: user.email } });
});

// Dashboard (protected route)
app.get('/dashboard', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.render('dashboard', { user });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
