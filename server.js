const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const ContactRouter = require('./routes/contact.js');
const SeriviceRouter = require('./routes/service.js');
const UserRoutes = require('./routes/users.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = 5000;

app.use('/v1/api/users', UserRoutes);
app.use('/v1/api/contactUs', ContactRouter);
app.use('/v1/api/serviceRequest', SeriviceRouter);

mongoose.connect(process.env.MONGODB_URI)
  .then (() => console.log(`✅ Database connected to ${mongoose.connection.name} at port ${PORT}`))
  .catch((error) => console.log(`Failed to connect to database`, error));

app.listen(PORT, () => {
  console.log(`✅ Server started at port: ${PORT}`);
})