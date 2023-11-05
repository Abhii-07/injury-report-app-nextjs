const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./src/routes/api');

const app = express();

// Connect to MongoDB (update with your MongoDB URI)
mongoose.connect('mongodb+srv://user:passwordMongoDB@injury-ms.tctkrbn.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

// Use the main route file
app.use('/', routes);

// Start the Express server
const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
