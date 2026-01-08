const express = require('express');
const path = require('path');

const assetRoutes = require('./routes/asset_routes');
const employeeRoutes = require('./routes/employee_routes');
const categoryRoutes = require('./routes/category_routes');

const app = express();

// Middleware to parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Application routes
app.use('/assets', assetRoutes);
app.use('/employees', employeeRoutes);
app.use('/categories', categoryRoutes);

module.exports = app;
