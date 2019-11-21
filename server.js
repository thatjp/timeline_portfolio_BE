
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error')

// Configuration vars
dotenv.config({ path: './config/config.env' });

connectDB();

// Route files
const projects = require('./routes/projects');
const positions = require('./routes/positions');

const app = express();

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body Parser
app.use(express.json());

// Mount Routers
app.use('/api/v1/projects', projects);
app.use('/api/v1/positions', positions);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold),
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.bold.red);
  server.close(() => process.exit(1));
});