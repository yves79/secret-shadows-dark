const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Change to true if using HTTPS
}));

let messages = [];
const users = ['ScorpiusBlack', 'MiaBlack'];

app.post('/login', (req, res) => {
    const { username } = req.body;
    if (users.includes(username)) {
        req.session.username = username;
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username' });
    }
});

app.get('/check-auth', (req, res) => {
    const authenticated = !!req.session.username;
    res.json({ authenticated });
});

app.post('/send-message', (req, res) => {
    const { message } = req.body;
    const user = req.session.username;
    if (!user) return res.status(401).json({ message: 'Not authenticated' });

    const newMessage = { user, message, timestamp: new Date() };
    messages.push(newMessage);
    res.json(newMessage);
});

app.get('/get-messages', (req, res) => {
    const now = new Date();
    messages = messages.filter(msg => (now - new Date(msg.timestamp)) < 24 * 60 * 60 * 1000); // 24 hours
    res.json({ messages });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});