const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const ContactRouter = require('./routes/contact.js');
const SeriviceRouter = require('./routes/service.js');
const UserRoutes = require('./routes/users.js');
const globalErrorHandler = require('./middlewares/errorController.js');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:['http://localhost:5173', 'https://kodianic.vercel.app'],
  credentials: true,
}));


const PORT = 5000;

const corsOptions = {
  origin: ['http://localhost:5173', 'https://kodianic.vercel.app'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use('/v1/api/users', UserRoutes);
app.use('/v1/api/contactUs', ContactRouter);
app.use('/v1/api/serviceRequest', SeriviceRouter);

app.use(globalErrorHandler);

mongoose.connect(process.env.MONGODB_URI)
  .then (() => console.log(`✅ Database connected to ${mongoose.connection.name} at port ${PORT}`))
  .catch((error) => console.log(`Failed to connect to database`, error));

app.listen(PORT, () => {
  console.log(`✅ Server started at port: ${PORT}`);
})