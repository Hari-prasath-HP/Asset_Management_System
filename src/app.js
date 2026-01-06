const express = require('express')
const path = require('path')
const assetRoutes = require('./routes/asset_routes');
const employeeRoutes = require('./routes/employee_routes');

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname,'public')))



app.use('/assets', assetRoutes);
app.use('/employees', employeeRoutes);
 
module.exports = app