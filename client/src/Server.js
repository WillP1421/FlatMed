// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Add this line for handling cookies

const app = express();
const PORT = 5000;

// Enable CORS, parse JSON, and handle cookies
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser()); 


const verifyToken = require('./authMiddleware');


const patients = [
  { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123' },

];


app.get('/protected_route', verifyToken, (req, res) => {
  res.json({ message: 'This route is protected' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const patient = patients.find(p => p.email === email && p.password === password);

  if (patient) {
    const token = jwt.sign({ id: patient.id, email: patient.email }, 'your_secret_key', {
      expiresIn: '1h',
    });

    res.cookie('authToken', token, { secure: true, httpOnly: true });
    res.status(200).json({
      id: patient.id,
      name: patient.name,
      email: patient.email,
      token: token,
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
