const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static (if any)
app.use('/static', express.static(path.join(__dirname, 'public')));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

// Handle form submission from browser, forward to Flask backend
app.post('/submit', async (req, res) => {
  try {
    // Compose payload to send to backend
    const payload = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    };

    // Backend service name is "backend" in docker-compose; port 5000
    const backendUrl = process.env.BACKEND_URL || 'http://backend:5000/process';

    // Forward the request (as JSON)
    const response = await axios.post(backendUrl, payload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000
    });

    // Send a friendly success page or redirect
    res.send(`<h2>Backend response</h2><pre>${JSON.stringify(response.data, null, 2)}</pre><p><a href="/">Back</a></p>`);
  } catch (err) {
    console.error('Error forwarding to backend:', err.message || err);
    const message = err.response ? JSON.stringify(err.response.data) : err.message;
    res.status(500).send(`<h2>Error</h2><pre>${message}</pre><p><a href="/">Back</a></p>`);
  }
});

app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}`);
});
