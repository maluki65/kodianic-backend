const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const ContactRouter = require('./routes/contact.js');
const SeriviceRouter = require('./routes/service.js');
const UserRoutes = require('./routes/users.js');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.use('/api/users', UserRoutes);
app.use('/api/contactUs', ContactRouter);
app.use('/api/serviceRequest', SeriviceRouter);

mongoose.connect(process.env.MONGODB_URI)
  .then (() => console.log(`✅ Database connected to ${mongoose.connection.name} at port ${PORT}`))
  .catch((error) => console.log(`Failed to connect to database`, error));

app.listen(PORT, () => {
  console.log(`✅ Server started at port: ${PORT}`);
})